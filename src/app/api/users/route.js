import { connectToDB } from "@/lib/mongodb";
import Users from "@/models/User";
import { NextResponse } from "next/server";

// **1- جلب جميع المستخدمين**
export async function GET() {
  await connectToDB();
  const users = await Users.find({ isDeleted: false });
  return NextResponse.json(users, { status: 200 });
}

// **2- إنشاء مستخدم جديد**
export async function POST(req) {
  await connectToDB();
  const { name, email } = await req.json();
  const newUser = await Users.create({ name, email });
  return NextResponse.json(newUser, { status: 201 });
}

// **3- تعديل بيانات المستخدم**
export async function PUT(req) {
  await connectToDB();
  const { id, name, email } = await req.json();
  const updatedUser = await Users.findByIdAndUpdate(
    id,
    { name, email },
    { new: true }
  );
  return NextResponse.json(updatedUser, { status: 200 });
}

// **4- حذف المستخدم (Soft Delete)**
export async function DELETE(req) {
  await connectToDB();
  const { id } = await req.json();
  await Users.findByIdAndUpdate(id, { isDeleted: true });
  return NextResponse.json({ message: "User soft deleted" }, { status: 200 });
}
