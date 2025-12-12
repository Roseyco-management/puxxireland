import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { addresses } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userAddresses = await db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, user.id));

    return NextResponse.json({ addresses: userAddresses });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch addresses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    // Validate required fields
    if (!name || !addressLine1 || !city) {
      return NextResponse.json(
        { error: 'Name, address line 1, and city are required' },
        { status: 400 }
      );
    }

    // If setting as default, unset other defaults
    if (isDefaultShipping) {
      await db
        .update(addresses)
        .set({ isDefaultShipping: false })
        .where(eq(addresses.userId, user.id));
    }

    if (isDefaultBilling) {
      await db
        .update(addresses)
        .set({ isDefaultBilling: false })
        .where(eq(addresses.userId, user.id));
    }

    // Create new address
    const newAddress = await db
      .insert(addresses)
      .values({
        userId: user.id,
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
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Address added successfully',
      address: newAddress[0],
    });
  } catch (error) {
    console.error('Error creating address:', error);
    return NextResponse.json(
      { error: 'Failed to create address' },
      { status: 500 }
    );
  }
}
