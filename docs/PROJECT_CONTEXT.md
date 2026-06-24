# Project Context for Codex

Dokumen ini adalah ringkasan konteks agar Codex di laptop lain bisa langsung memahami arah project tanpa history chat.

## Tujuan Project

MahaTeams New Gen adalah aplikasi presensi web untuk Mahative Studio dan Kipa. Project ini adalah generasi baru dari website presensi lama Mahative.

Fokus MVP:

- presensi WFO/WFH
- role Super Admin, Admin, Member
- status member Team dan Intern
- Default Studio dan placement lintas studio Mahative/Kipa
- dashboard presensi
- kalender status
- izin, sakit, cuti, alpha, terlambat
- QR card untuk WFO nanti
- PostgreSQL online agar bisa dipakai dari banyak laptop

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL via Neon
- GitHub
- Vercel

## Status Terakhir

Sudah ada:

- Project Next.js dan shadcn/ui.
- Prisma schema di `prisma/schema.prisma`.
- Database utama memakai Neon.
- Vercel sudah berhasil deploy dari GitHub.
- Dashboard `/` sudah dynamic dan membaca data dari PostgreSQL.
- Login sederhana di `/login`.
- Dashboard khusus Super Admin di `/super-admin`.
- Role management MVP di `/roles`.
- Session auth memakai signed cookie.
- Password preview memakai hash `scrypt`.
- Seed data preview di `prisma/seed.mjs`.

Belum ada:

- registrasi member publik
- QR scanner/presensi WFO
- WFH check-in/check-out plan/report
- halaman member management lengkap
- halaman izin/sakit/cuti
- dashboard khusus Admin dan Member
- middleware auth global
- UI final

## Setup di Laptop Baru

Laptop baru tidak perlu install PostgreSQL lokal. Database utama memakai Neon online.

```bash
git clone https://github.com/USERNAME/mahateams-new-gen.git
cd mahateams-new-gen
npm install
```

Buat file `.env` dari `.env.example`, lalu isi dengan Neon.

```env
DATABASE_URL="postgresql://USER:PASSWORD@EP-pooler.REGION.aws.neon.tech/DBNAME?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://USER:PASSWORD@EP.REGION.aws.neon.tech/DBNAME?sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
AUTH_SECRET="random-secret-panjang"
```

Jalankan:

```bash
npm run dev
```

Di PowerShell Windows, jika `npm` diblokir oleh policy:

```bash
npm.cmd run dev
```

## Database

Primary database: Neon PostgreSQL.

- `DATABASE_URL`: pooled connection, hostname berisi `-pooler`, dipakai aplikasi dan Vercel.
- `DIRECT_URL`: direct connection, hostname tanpa `-pooler`, dipakai Prisma CLI.

Command database:

```bash
npm.cmd run db:generate
npm.cmd run db:push
npm.cmd run db:seed
npm.cmd run db:studio
```

Catatan:

- Jangan commit `.env`.
- Jangan menaruh password Neon asli di dokumen.
- Jika schema berubah, cukup satu laptop menjalankan `db:push` ke Neon.
- Jangan menjalankan `db:seed` sembarangan jika data sudah bukan preview.

## Akun Preview

```txt
Super Admin
email: owner@mahateams.local
password: owner123

Admin
email: admin.mahative@mahateams.local
password: admin123

Member
email: member@mahateams.local
password: member123
```

Super Admin dibuat manual/sistem, bukan dari registrasi publik.

## Role Rules

Role:

- `SUPER_ADMIN`
- `ADMIN`
- `MEMBER`

Keputusan:

- Super Admin adalah owner studio Mahative/Kipa.
- Super Admin tidak perlu registrasi publik.
- Registrasi publik nanti hanya membuat role `MEMBER`.
- Admin adalah member/karyawan yang diberi akses tambahan.
- Admin bisa mengubah Member menjadi Admin di MVP role management.
- Super Admin tidak boleh diubah dari halaman role MVP.

Status member:

- `TEAM`
- `INTERN`

Intern memiliki program `MAGANG` atau `PKL`, institusi, tanggal mulai, tanggal selesai, dan mentor opsional.

## Studio dan Placement

Konsep:

- `defaultStudio` adalah studio asal user.
- `placement` adalah lokasi kerja aktif jika user dipindah sementara ke studio lain.
- Presensi tetap masuk owner/default studio, tetapi lokasi presensi bisa mengikuti placement.

Contoh:

```txt
Intern default Mahative dipindah ke Kipa 50 hari.
Rekap tetap milik Mahative.
Lokasi presensi tercatat Kipa.
Mahative tidak menghitung 50 hari itu sebagai alpha.
```

## Attendance Rules MVP

Metrik dipisah:

- Jumlah Presensi
- Izin
- Sakit
- WFH
- Tepat Waktu
- Terlambat
- Alpha

Aturan:

- Jam masuk contoh: 08.00.
- Toleransi tepat waktu: 10 menit.
- Telat dihitung dari 08.00, bukan 08.10.
- 08.11 sampai 11.59 masih terlambat.
- Alpha jika tidak ada check-in/keterangan sampai 12.00.
- Terlambat wajib diganti di hari yang sama.
- Alpha wajib diganti di hari lain.
- Izin H-1 atau 24 jam sebelum hari masuk.
- Sakit boleh hari H dengan cutoff 30 atau 60 menit sebelum jam masuk.

## WFO, WFH, dan QR

WFO:

- pakai QR card personal statis
- QR dibuat sekali di awal akun
- QR card juga berfungsi sebagai identitas
- QR tidak diupload via file explorer sebagai flow utama

WFH:

- tidak memakai QR
- dibuat/diperintahkan oleh Super Admin lewat jadwal
- Member wajib mengisi rencana kerja dan laporan kerja

Geofence:

- titik nol/radius disiapkan
- luar radius tidak ditolak otomatis
- status soft warning: `Diluar Jangkauan`

## Kalender

Kalender dashboard saat ini:

- kalender bulan berjalan
- highlight hari ini
- warna mengikuti status presensi
- data diambil dari PostgreSQL

Rencana:

- Dashboard Super Admin: kalender libur/cuti dan kalender aktivitas studio.
- Jadwal kerja: kalender personal WFO/WFH per member.
- Cuti/libur: kalender editable untuk libur nasional, cuti bersama, hari pengganti, libur final.
- Member: kalender pribadi.

## File Penting

```txt
src/app/page.tsx              Dashboard dynamic
src/app/super-admin/page.tsx  Dashboard khusus Super Admin
src/app/login/page.tsx        Halaman login
src/app/login/actions.ts      Login/logout actions
src/app/roles/page.tsx        Role management MVP
src/lib/auth.ts               Session auth dan password verify
src/lib/roles.ts              Rule role MVP
src/lib/prisma.ts             Prisma client
prisma/schema.prisma          Database schema
prisma/seed.mjs               Seed data preview
docs/NEON_DATABASE.md         Panduan Neon
docs/LOCAL_DATABASE.md        Panduan lokal lama, optional
```

## Vercel

Vercel sudah pernah berhasil deploy dari GitHub.

Environment variables di Vercel:

```env
DATABASE_URL="Neon pooled URL"
DIRECT_URL="Neon direct URL"
AUTH_SECRET="random-secret-panjang"
NEXT_PUBLIC_APP_URL="https://domain-vercel-project"
```

Jika deploy gagal karena env, cek Vercel Project Settings > Environment Variables.

## Next Step Disarankan

1. Rapikan flow auth dan route guard.
2. Buat halaman register Member.
3. Buat dashboard role-aware:
   - Super Admin melihat semua studio.
   - Admin melihat scope studionya.
   - Member melihat data dirinya.
4. Buat halaman user/member management.
5. Buat presensi WFO/WFH.
6. Buat request izin/sakit/cuti.
7. Rapikan UI final setelah flow inti jalan.

## Catatan Untuk Codex Berikutnya

- Baca dokumen ini sebelum coding.
- Jangan commit `.env`.
- Jangan menaruh password Neon asli di dokumen.
- Jangan menghapus keputusan PRD lama tanpa konfirmasi user.
- Fokus implementasi mengikuti pola existing Next.js + shadcn + Prisma.
- Saat memakai PowerShell Windows, gunakan `npm.cmd` jika `npm` diblokir execution policy.
