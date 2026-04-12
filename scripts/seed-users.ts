import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://127.0.0.1:54321";
const SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

interface SeedUser {
  email: string;
  password: string;
  displayName: string;
  role: "admin" | "client" | "dancer";
  tier?: string;
  bio?: string;
  initialBalance?: number;
}

const users: SeedUser[] = [
  {
    email: "timjackson2nd@gmail.com",
    password: "CherryAdmin2024!",
    displayName: "Tim Jackson",
    role: "admin",
    tier: "Virtuoso",
    initialBalance: 50000
  },
  {
    email: "thebrucewaynejunior@gmail.com",
    password: "CherryClient2024!",
    displayName: "Bruce Wayne Jr",
    role: "client",
    tier: "Virtuoso",
    initialBalance: 10000
  },
  {
    email: "goldenchiold@gmail.com",
    password: "CherryDancer2024!",
    displayName: "Golden Child",
    role: "dancer",
    tier: "Virtuoso",
    bio: "Premium immersive performer specializing in 3D and VR experiences.",
    initialBalance: 25000
  },
  {
    email: "blankfacedstudios@gmail.com",
    password: "CherryAdmin2024!",
    displayName: "BlankFaced Studios",
    role: "admin",
    tier: "Virtuoso",
    initialBalance: 100000
  },
  {
    email: "floydbeararms@gmail.com",
    password: "CherrySuperSonic3!",
    displayName: "Floyd Beararms",
    role: "admin",
    tier: "Supersonic 3rd Edition",
    bio: "Executive visionary. Full-stack access across all CherryStim portals.",
    initialBalance: 75000
  },
  {
    email: "prettyboi.floyd.45@gmail.com",
    password: "CherrySuperSonic3!",
    displayName: "PrettyBoi Floyd",
    role: "admin",
    tier: "Supersonic 3rd Edition",
    bio: "Creative strategist with immersive entertainment expertise.",
    initialBalance: 75000
  },
  {
    email: "Santiabc55@gmail.com",
    password: "CherrySuperSonic3!",
    displayName: "Santi ABC",
    role: "admin",
    tier: "Supersonic 3rd Edition",
    bio: "Growth operator. Full admin, client, and dancer portal access.",
    initialBalance: 75000
  }
];

async function seedUser(user: SeedUser) {
  console.log(`Creating user: ${user.email} (${user.role})...`);

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: user.email,
    password: user.password,
    email_confirm: true,
    user_metadata: { display_name: user.displayName, role: user.role }
  });

  if (authError) {
    if (authError.message.includes("already been registered")) {
      console.log(`  ↳ User already exists, fetching...`);
      const { data: list } = await supabase.auth.admin.listUsers();
      const existing = list?.users?.find((u) => u.email === user.email);
      if (!existing) {
        console.error(`  ✗ Could not find existing user ${user.email}`);
        return;
      }
      return seedProfile(existing.id, user);
    }
    console.error(`  ✗ Auth error: ${authError.message}`);
    return;
  }

  if (!authData.user) {
    console.error(`  ✗ No user returned`);
    return;
  }

  return seedProfile(authData.user.id, user);
}

async function seedProfile(userId: string, user: SeedUser) {
  const { error: profileError } = await supabase.from("profiles").upsert({
    id: userId,
    display_name: user.displayName,
    role: user.role,
    tier: user.tier || "Pro"
  });

  if (profileError) {
    console.error(`  ✗ Profile error: ${profileError.message}`);
    return;
  }

  const { error: walletError } = await supabase.from("coin_wallets").upsert({
    user_id: userId,
    balance: user.initialBalance || 0
  });

  if (walletError) {
    console.error(`  ✗ Wallet error: ${walletError.message}`);
  }

  if (user.role === "dancer" && user.bio) {
    const { error: dancerError } = await supabase.from("dancer_profiles").upsert({
      user_id: userId,
      bio: user.bio,
      gear_owner: "cherrystim"
    });
    if (dancerError) {
      console.error(`  ✗ Dancer profile error: ${dancerError.message}`);
    }
  }

  console.log(`  ✓ ${user.displayName} (${user.role}) seeded with ${user.initialBalance?.toLocaleString()} coins`);
}

async function main() {
  console.log("🍒 Seeding CherryStim users...\n");

  for (const user of users) {
    await seedUser(user);
  }

  console.log("\n✅ Seed complete!");
  console.log("\nLogin credentials:");
  console.log("─".repeat(60));
  for (const user of users) {
    console.log(`  ${user.email}`);
    console.log(`    Password: ${user.password}`);
    console.log(`    Role: ${user.role}\n`);
  }
}

main().catch(console.error);
