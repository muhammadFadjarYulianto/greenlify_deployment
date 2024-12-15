import React, { useState, useEffect } from "react";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import {
  getMembersManagement,
  addMember,
  updateMember,
  deleteMember,
} from "@/services/memberManagement.js";
import useDateStore from "@/store/useDateStore";

export default function DashboardMembership() {
  const [members, setMembers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const { formatDate } = useDateStore();
  const { toast } = useToast();

  const fetchMembers = async () => {
    try {
      const fetchedMembers = await getMembersManagement();
      setMembers(fetchedMembers);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
    }
  };

  const handleAddMember = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newMember = {
      desa: formData.get("desa"),
      rw: formData.get("rw"),
      rt: formData.get("rt"),
    };

    try {
      await addMember(newMember);
      toast({
        title: "Berhasil",
        description: "Member baru telah ditambahkan",
      });
      setIsAddModalOpen(false);
      await fetchMembers();
      event.target.reset();
    } catch (error) {
      toast({
        title: "Member Gagal Ditambahkan",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditMember = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedMember = {
      desa: formData.get("desa"),
      rw: formData.get("rw"),
      rt: formData.get("rt"),
    };

    try {
      await updateMember(currentMember.id, updatedMember);
      toast({
        title: "Berhasil",
        description: "Member telah diperbarui.",
      });
      setIsEditModalOpen(false);
      await fetchMembers();
    } catch (error) {
      toast({
        title: "Terjadi Kesalahan",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await deleteMember(memberId);
      setIsDeleteModalOpen(false);
      toast({
        title: "Berhasil",
        description: "Member telah dihapus",
      });
      await fetchMembers();
    } catch (error) {
      toast({
        title: "Terjadi Kesalahan",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/"
                  className="text-[16px] font-normal leading-[28px]"
                >
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/Dashboard"
                  className="text-[16px] font-normal leading-[28px]"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[16px] font-normal leading-[28px]">
                  Anggota
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mr-0 md:mr-6">
          <div>
            <Typography variant="h1" className="text-4xl lg:text-5xl">
              Manajemen Anggota
            </Typography>
            <Typography variant="p" className="text-slate-700 mt-4">
              Tambahkan anggota baru untuk memperluas jaringan dan meningkatkan kolaborasi dalam komunitas.
            </Typography>
          </div>
          <Button
            variant="primary"
            className="text-white shadow-lg"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-6 h-6 mr-2" />
            Tambah Keanggotaan
          </Button>
        </div>
        <div className="grid gap-4 grid-cols-1">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xl text-center">
                      Nama Desa
                    </TableHead>
                    <TableHead className="text-xl text-center">
                      No. RW
                    </TableHead>
                    <TableHead className="text-xl text-center">
                      No. RT
                    </TableHead>
                    <TableHead className="text-xl text-center">
                      Tanggal Bergabung
                    </TableHead>
                    <TableHead className="text-xl text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="text-center">
                        {member.desa}
                      </TableCell>
                      <TableCell className="text-center">
                        RW {member.rw}
                      </TableCell>
                      <TableCell className="text-center">
                        RT {member.rt}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatDate(member.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <div className="flex justify-end gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => {
                                    setCurrentMember(member);
                                    setIsEditModalOpen(true);
                                  }}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-emerald-600">
                                <Typography
                                  variant="p"
                                  className="text-background"
                                >
                                  Edit Member
                                </Typography>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => {
                                    setCurrentMember(member);
                                    setIsDeleteModalOpen(true);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-emerald-600">
                                <Typography
                                  variant="p"
                                  className="text-background"
                                >
                                  Hapus Member
                                </Typography>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-center text-[30px] font-bold leading-[36px]">
              Tambah Anggota Baru
            </DialogTitle>
            <Typography
              variant="p"
              className="text-left max-w-lg text-slate-500"
            >
              Tambahkan data anggota baru dengan mengisi form berikut.
            </Typography>
          </DialogHeader>
          <form onSubmit={handleAddMember} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="desa"
                className="text-[18px] font-bold text-emerald-600"
              >
                Nama Desa
              </Label>
              <Input
                id="desa"
                name="desa"
                required
                placeholder="Masukkan nama desa"
                className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="rw"
                className="text-[18px] font-bold text-emerald-600"
              >
                RW
              </Label>
              <Input
                id="rw"
                name="rw"
                required
                placeholder="Masukkan nomor RW"
                className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="rt"
                className="text-[18px] font-bold text-emerald-600"
              >
                RT
              </Label>
              <Input
                id="rt"
                name="rt"
                required
                placeholder="Masukkan nomor RT"
                className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100"
              />
            </div>
            <Button type="submit" className="w-full">
              Simpan
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-center text-[30px] font-bold leading-[36px]">
              Edit Anggota
            </DialogTitle>
            <Typography
              variant="p"
              className="text-left max-w-lg text-slate-500"
            >
              Ubah informasi anggota untuk memperbarui data keanggotaan.
            </Typography>
          </DialogHeader>
          <form onSubmit={handleEditMember} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="desa"
                className="text-[18px] font-bold text-emerald-600"
              >
                Nama Desa
              </Label>
              <Input
                id="desa"
                name="desa"
                required
                defaultValue={currentMember?.desa || ""}
                placeholder="Masukkan nama desa"
                className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="rw"
                className="text-[18px] font-bold text-emerald-600"
              >
                RW
              </Label>
              <Input
                id="rw"
                name="rw"
                required
                defaultValue={currentMember?.rw || ""}
                placeholder="Masukkan nomor RW"
                className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="rt"
                className="text-[18px] font-bold text-emerald-600"
              >
                RT
              </Label>
              <Input
                id="rt"
                name="rt"
                required
                defaultValue={currentMember?.rt || ""}
                placeholder="Masukkan nomor RT"
                className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100"
              />
            </div>
            <Button type="submit" className="w-full">
              Simpan Perubahan
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-left text-[30px] font-bold leading-[36px]">
              Hapus Anggota
            </DialogTitle>
            <Typography
              variant="p"
              className="text-left max-w-lg text-slate-500"
            >
              Apakah Anda yakin ingin menghapus data anggota ini? Data yang
              dihapus tidak dapat dikembalikan.
            </Typography>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleDeleteMember(currentMember.id);
              }}
            >
              Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
