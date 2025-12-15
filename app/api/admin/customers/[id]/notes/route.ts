import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { customerNotes, users } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * POST /api/admin/customers/[id]/notes
 * Add a note to a customer
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const db = getDb();
    const body = await request.json();
    const { note, createdBy } = body;

    if (!note || !createdBy) {
      return NextResponse.json(
        { success: false, error: 'Note and createdBy are required' },
        { status: 400 }
      );
    }

    // Insert the note
    const [newNote] = await db
      .insert(customerNotes)
      .values({
        userId: customerId,
        note,
        createdBy: parseInt(createdBy),
      })
      .returning();

    return NextResponse.json({
      success: true,
      note: newNote,
    });
  } catch (error) {
    console.error('Error adding customer note:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add customer note',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/customers/[id]/notes
 * Get all notes for a customer
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const db = getDb();

    const notes = await db
      .select({
        id: customerNotes.id,
        note: customerNotes.note,
        createdAt: customerNotes.createdAt,
        updatedAt: customerNotes.updatedAt,
        createdBy: customerNotes.createdBy,
        createdByName: users.name,
        createdByEmail: users.email,
      })
      .from(customerNotes)
      .leftJoin(users, eq(customerNotes.createdBy, users.id))
      .where(eq(customerNotes.userId, customerId))
      .orderBy(desc(customerNotes.createdAt));

    return NextResponse.json({
      success: true,
      notes: notes.map((note) => ({
        id: note.id,
        note: note.note,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        createdBy: {
          id: note.createdBy,
          name: note.createdByName,
          email: note.createdByEmail,
        },
      })),
    });
  } catch (error) {
    console.error('Error fetching customer notes:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch customer notes',
      },
      { status: 500 }
    );
  }
}
