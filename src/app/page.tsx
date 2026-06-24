import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  QrCode,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const metrics = [
  { label: "Jumlah Presensi", value: "0", color: "text-sky-700" },
  { label: "Izin", value: "0", color: "text-amber-700" },
  { label: "Sakit", value: "0", color: "text-violet-700" },
  { label: "WFH", value: "0", color: "text-blue-700" },
  { label: "Terlambat", value: "0", color: "text-orange-700" },
  { label: "Alpha", value: "0", color: "text-red-700" },
];

const attendancePreview = [
  {
    name: "Dwi Ramadhani",
    studio: "Mahative",
    mode: "WFO",
    status: "Tepat Waktu",
  },
  {
    name: "Inti Indriyani",
    studio: "Kipa",
    mode: "WFH",
    status: "Rencana Kerja",
  },
  {
    name: "Naufal Hisyam Abdillah",
    studio: "Mahative",
    mode: "WFO",
    status: "Diluar Jangkauan",
  },
];

const calendarDays = [
  { date: "1", label: "Libur", className: "bg-zinc-200 text-zinc-700" },
  { date: "2", label: "WFO", className: "bg-emerald-100 text-emerald-800" },
  { date: "3", label: "WFO", className: "bg-emerald-100 text-emerald-800" },
  { date: "4", label: "WFH", className: "bg-blue-100 text-blue-800" },
  { date: "5", label: "Izin", className: "bg-amber-100 text-amber-800" },
  { date: "6", label: "Sakit", className: "bg-violet-100 text-violet-800" },
  { date: "7", label: "Alpha", className: "bg-red-100 text-red-800" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-zinc-200 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge variant="outline" className="mb-3 bg-white">
              MVP Presensi
            </Badge>
            <h1 className="text-2xl font-semibold">MahaTeams New Gen</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">
              Dashboard awal untuk presensi Mahative Studio dan Kipa dengan
              role, studio, QR WFO, WFH, cuti, dan kalender kerja.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>
              <QrCode aria-hidden="true" />
              Mulai Presensi
            </Button>
            <Button variant="outline">
              <CalendarDays aria-hidden="true" />
              Kalender
            </Button>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardHeader className="pb-2">
                <CardDescription>{metric.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`text-3xl font-semibold ${metric.color}`}>
                  {metric.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Hari Ini</CardTitle>
              <CardDescription>
                Tampilan awal report operasional untuk Super Admin dan Admin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Studio</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendancePreview.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.studio}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.mode}</Badge>
                      </TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kalender Status</CardTitle>
              <CardDescription>
                Warna tanggal mengikuti status presensi dan jadwal kerja.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day) => (
                  <div
                    key={day.date}
                    className={`flex aspect-square flex-col items-center justify-center rounded-md text-xs font-medium ${day.className}`}
                  >
                    <span className="text-base">{day.date}</span>
                    <span>{day.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-emerald-700" />
                Role
              </CardTitle>
              <CardDescription>
                Super Admin, Admin, dan Member sudah menjadi dasar akses.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-5 text-blue-700" />
                Studio
              </CardTitle>
              <CardDescription>
                Default Studio dan placement lintas studio disiapkan di schema.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock3 className="size-5 text-orange-700" />
                Policy
              </CardTitle>
              <CardDescription>
                Toleransi 10 menit, cutoff Alpha, dan aturan izin sakit siap
                dikembangkan.
              </CardDescription>
              <CardAction>
                <UserRoundCheck className="size-5 text-zinc-500" />
              </CardAction>
            </CardHeader>
          </Card>
        </section>

        <footer className="flex items-center gap-2 border-t border-zinc-200 py-4 text-xs text-zinc-500">
          <CheckCircle2 className="size-4 text-emerald-700" />
          Stack awal siap: Next.js, shadcn/ui, Prisma, PostgreSQL, GitHub, dan
          Vercel.
        </footer>
      </div>
    </main>
  );
}
