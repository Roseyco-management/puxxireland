import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { getDb } from '@/lib/db/drizzle';
import { addresses } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const addressId = parseInt(id);
    const db = getDb();

    const address = await db
      .select()
      .from(addresses)
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, user.id)))
      .limit(1);

    if (address.length === 0) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    return NextResponse.json({ address: address[0] });
  } catch (error) {
    console.error('Error fetching address:', error);
    return NextResponse.json(
      { error: 'Failed to fetch address' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const addressId = parseInt(id);
    const db = getDb();

    const body = await request.json();
    const {
      name,
      addressLine1,
      addressLine2,
      city,
      county,
      eircode,
      country,
      phone,
      isDefaultShipping,
      isDefaultBilling,
    } = body;

    // Verify address belongs to user
    const existingAddress = await db
      .select()
      .from(addresses)
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, user.id)))
      .limit(1);

    if (existingAddress.length === 0) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    // If setting as default, unset other defaults
    if (isDefaultShipping) {
      await db
        .update(addresses)
        .set({ isDefaultShipping: false })
        .where(and(
          eq(addresses.userId, user.id),
          eq(addresses.isDefaultShipping, true)
        ));
    }

    if (isDefaultBilling) {
      await db
        .update(addresses)
        .set({ isDefaultBilling: false })
        .where(and(
          eq(addresses.userId, user.id),
          eq(addresses.isDefaultBilling, true)
        ));
    }

    // Update address
    const updatedAddress = await db
      .update(addresses)
      .set({
        name,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        county: county || null,
        eircode: eircode || null,
        country: country || 'IE',
        phone: phone || null,
        isDefaultShipping: isDefaultShipping || false,
        isDefaultBilling: isDefaultBilling || false,
        updatedAt: new Date(),
      })
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, user.id)))
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Address updated successfully',
      address: updatedAddress[0],
    });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json(
      { error: 'Failed to update address' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const addressId = parseInt(id);
    const db = getDb();

    // Verify address belongs to user
    const existingAddress = await db
      .select()
      .from(addresses)
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, user.id)))
      .limit(1);

    if (existingAddress.length === 0) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    // Delete address
    await db
      .delete(addresses)
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, user.id)));

    return NextResponse.json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json(
      { error: 'Failed to delete address' },
      { status: 500 }
    );
  }
}
