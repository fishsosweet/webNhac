import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PrivateRoute from '../src/services/PrivateRoute.tsx';
import TheLoai from '../src/pages/Admin/TheLoai/Them.tsx'
import CaSi from '../src/pages/Admin/CaSi/Them.tsx'
import BaiHat from "./pages/Admin/Nhac/Them.tsx";
import SuaCaSi from '../src/pages/Admin/CaSi/Sua.tsx'
import ListCaSi from '../src/pages/Admin/CaSi/List.tsx'
import ListBaiHat from "./pages/Admin/Nhac/List.tsx";
import SuaBaiHat from "./pages/Admin/Nhac/Sua.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ListTheLoai from "./pages/Admin/TheLoai/List.tsx";

import LoginPage from "./pages/Admin/LoginPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import AdminPage from "./pages/Admin/AdminPage.tsx";
import SuaTheLoai from "./pages/Admin/TheLoai/Sua.tsx";
import SidebarUser from "./pages/User/SideBar.tsx"
import Playlist from "./pages/Admin/Playlist/Them.tsx";
import ListPlaylist from "./pages/Admin/Playlist/List.tsx";
import SuaPlaylist from "./pages/Admin/Playlist/Sua.tsx";

const router = createBrowserRouter([
    {
        path: "/login-admin",
        element: <LoginPage/>,
    },
    {
        path: "/zingmp4",
        element: <SidebarUser/>,
    },
    {
        path: "/user",
        element:  <PrivateRoute>
            <UserPage />
        </PrivateRoute>
    },
    {
        path: "/admin",
        element:  <PrivateRoute>
            <AdminPage />
        </PrivateRoute>
    },
    {
        path: "/admin/add-categories",
        element:  <PrivateRoute>
            <TheLoai />
        </PrivateRoute>
    },
    {
        path: "/admin/add-singers",
        element:  <PrivateRoute>
            <CaSi />
        </PrivateRoute>
    },
    {
        path: "/admin/add-songs",
        element:  <PrivateRoute>
            <BaiHat />
        </PrivateRoute>
    },
    {
        path: "/admin/add-playlists",
        element:  <PrivateRoute>
            <Playlist />
        </PrivateRoute>
    },
    {
        path: "/admin/list-categories",
        element:  <PrivateRoute>
            <ListTheLoai />
        </PrivateRoute>
    },
    {
        path: "/admin/list-singers",
        element:  <PrivateRoute>
            <ListCaSi />
        </PrivateRoute>
    },
    {
        path: "/admin/list-songs",
        element:  <PrivateRoute>
            <ListBaiHat />
        </PrivateRoute>
    },
    {
        path: "/admin/list-playlists",
        element:  <PrivateRoute>
            <ListPlaylist />
        </PrivateRoute>
    },
    {
        path: "/admin/categories/edit/:id",
        element:  <PrivateRoute>
            <SuaTheLoai />
        </PrivateRoute>
    },
    {
        path: "/admin/singers/edit/:id",
        element:  <PrivateRoute>
            <SuaCaSi />
        </PrivateRoute>
    },
    {
        path: "/admin/songs/edit/:id",
        element:  <PrivateRoute>
            <SuaBaiHat />
        </PrivateRoute>
    },
    {
        path: "/admin/playlists/edit/:id",
        element:  <PrivateRoute>
            <SuaPlaylist />
        </PrivateRoute>
    },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
