import { PrismaClient, UserRole, RoomType, RoomStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin users
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const manager = await prisma.user.upsert({
    where: { username: 'manager' },
    update: {},
    create: {
      username: 'manager',
      password: hashedPassword,
      role: UserRole.MANAGER,
    },
  });

  const receptionist = await prisma.user.upsert({
    where: { username: 'receptionist' },
    update: {},
    create: {
      username: 'receptionist',
      password: hashedPassword,
      role: UserRole.RECEPTIONIST,
    },
  });

  const staff = await prisma.user.upsert({
    where: { username: 'staff' },
    update: {},
    create: {
      username: 'staff',
      password: hashedPassword,
      role: UserRole.STAFF,
    },
  });

  console.log('✅ Admin users created');

  // Create rooms
  const rooms = [
    {
      roomNumber: '101',
      roomType: RoomType.STANDARD,
      status: RoomStatus.AVAILABLE,
      price: 100.00,
      description: 'Standard room with city view',
    },
    {
      roomNumber: '102',
      roomType: RoomType.STANDARD,
      status: RoomStatus.AVAILABLE,
      price: 100.00,
      description: 'Standard room with garden view',
    },
    {
      roomNumber: '201',
      roomType: RoomType.DELUXE,
      status: RoomStatus.AVAILABLE,
      price: 150.00,
      description: 'Deluxe room with balcony',
    },
    {
      roomNumber: '202',
      roomType: RoomType.DELUXE,
      status: RoomStatus.AVAILABLE,
      price: 150.00,
      description: 'Deluxe room with city view',
    },
    {
      roomNumber: '301',
      roomType: RoomType.SUITE,
      status: RoomStatus.AVAILABLE,
      price: 250.00,
      description: 'Luxury suite with living area',
    },
    {
      roomNumber: '302',
      roomType: RoomType.SUITE,
      status: RoomStatus.AVAILABLE,
      price: 250.00,
      description: 'Presidential suite with panoramic view',
    },
  ];

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { roomNumber: room.roomNumber },
      update: {},
      create: room,
    });
  }

  console.log('✅ Rooms created');

  // Create sample bookings
  const room101 = await prisma.room.findUnique({ where: { roomNumber: '101' } });
  const room201 = await prisma.room.findUnique({ where: { roomNumber: '201' } });

  if (room101) {
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 1);
    const checkOut = new Date();
    checkOut.setDate(checkOut.getDate() + 3);

    await prisma.booking.create({
      data: {
        bookingId: 'HE' + Date.now().toString(36).toUpperCase(),
        guestName: 'John Doe',
        guestEmail: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        roomId: room101.id,
        checkIn,
        checkOut,
        totalAmount: 200.00,
        specialRequests: 'Late check-in requested',
        createdById: receptionist.id,
      },
    });
  }

  if (room201) {
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 2);
    const checkOut = new Date();
    checkOut.setDate(checkOut.getDate() + 5);

    await prisma.booking.create({
      data: {
        bookingId: 'HE' + (Date.now() + 1000).toString(36).toUpperCase(),
        guestName: 'Jane Smith',
        guestEmail: 'jane.smith@example.com',
        phoneNumber: '+1987654321',
        roomId: room201.id,
        checkIn,
        checkOut,
        totalAmount: 450.00,
        specialRequests: 'Vegetarian breakfast requested',
        createdById: manager.id,
      },
    });
  }

  console.log('✅ Sample bookings created');

  console.log('🎉 Database seeding completed!');
  console.log('\n📋 Login Credentials:');
  console.log('Manager: username=manager, password=admin123');
  console.log('Receptionist: username=receptionist, password=admin123');
  console.log('Staff: username=staff, password=admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
