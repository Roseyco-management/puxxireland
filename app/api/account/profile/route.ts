import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { users, profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile
    const userProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    return NextResponse.json({
      user,
      profile: userProfile[0] || null,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, phone, marketingConsent } = body;

    // Update user name
    const fullName = `${firstName} ${lastName}`.trim();
    await db
      .update(users)
      .set({
        name: fullName,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Check if profile exists
    const existingProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    if (existingProfile.length > 0) {
      // Update existing profile
      await db
        .update(profiles)
        .set({
          phone: phone || null,
          marketingConsent: marketingConsent || false,
          updatedAt: new Date(),
        })
        .where(eq(profiles.userId, user.id));
    } else {
      // Create new profile
      await db.insert(profiles).values({
        userId: user.id,
        phone: phone || null,
        marketingConsent: marketingConsent || false,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
