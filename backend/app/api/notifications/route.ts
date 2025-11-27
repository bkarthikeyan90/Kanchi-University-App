import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/middleware';
import { sendPushNotification } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const notifications = await prisma.notification.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ data: notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    if ('error' in auth) {
      return auth.error;
    }

    const body = await request.json();
    const { title, body: notificationBody, type, targetAudience, departmentId, userId, data } = body;

    if (!title || !notificationBody) {
      return NextResponse.json(
        { error: 'Title and body are required' },
        { status: 400 }
      );
    }

    // Create notification record
    const notification = await prisma.notification.create({
      data: {
        title,
        body: notificationBody,
        type: type || 'GENERAL',
        targetAudience,
        departmentId,
        userId,
        data: data ? JSON.stringify(data) : null,
        createdBy: auth.user.userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    // Send push notifications
    try {
      let tokens: string[] = [];

      if (targetAudience === 'ALL') {
        const users = await prisma.appUser.findMany({
          where: {
            isActive: true,
            fcmToken: { not: null },
          },
          select: { fcmToken: true },
        });
        tokens = users.map((u: { fcmToken: string | null }) => u.fcmToken!).filter(Boolean) as string[];
      } else if (targetAudience === 'DEPARTMENT' && departmentId) {
        // Get users by department (if you have user-department relation)
        // For now, send to all users
        const users = await prisma.appUser.findMany({
          where: {
            isActive: true,
            fcmToken: { not: null },
          },
          select: { fcmToken: true },
        });
        tokens = users.map((u: { fcmToken: string | null }) => u.fcmToken!).filter(Boolean) as string[];
      } else if (targetAudience === 'USER' && userId) {
        const user = await prisma.appUser.findUnique({
          where: { id: userId },
          select: { fcmToken: true },
        });
        if (user?.fcmToken) {
          tokens = [user.fcmToken];
        }
      }

      if (tokens.length > 0) {
        try {
          await sendPushNotification(tokens, title, notificationBody, data);
          await prisma.notification.update({
            where: { id: notification.id },
            data: { isSent: true, sentAt: new Date() },
          });
        } catch (pushError) {
          console.error('Error sending push notification:', pushError);
          // Mark as sent even if push fails (notification record exists)
          await prisma.notification.update({
            where: { id: notification.id },
            data: { isSent: true, sentAt: new Date() },
          });
        }
      }
    } catch (pushError) {
      console.error('Error sending push notification:', pushError);
      // Don't fail the request if push fails
    }

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

