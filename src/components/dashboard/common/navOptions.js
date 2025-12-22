import {
  FileText,
  FolderKanban,
  Gavel,
  Home,
  LayoutDashboard,
  ListChecks,
  Pencil,
  PlusCircle,
  Trophy,
  User,
  Users,
} from "lucide-react";

/*  USER NAVIGATION  */
export const userOptions = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Winning Contests",
    path: "/dashboard/winning",
    icon: Trophy,
  },
  {
    name: "Participated Contests",
    path: "/dashboard/participated",
    icon: ListChecks,
  },
];

/*  ADMIN NAVIGATION  */
export const adminOptions = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Statistics",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Users",
    path: "/dashboard/manage-users",
    icon: Users,
  },
  {
    name: "Manage Contests",
    path: "/dashboard/manage-contests",
    icon: Gavel,
  },
];

/* CREATOR NAVIGATION */
export const creatorOptions = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Contest",
    path: "/dashboard/add-contest",
    icon: PlusCircle,
  },
  {
    name: "Created Contests",
    path: "/dashboard/created-contests",
    icon: FolderKanban,
  },
  {
    name: "Submitted Tasks",
    path: "/dashboard/submitted-tasks",
    icon: FileText,
  },
  {
    name: "Edit Contest",
    path: "/dashboard/edit-contest",
    icon: Pencil,
  },
];
