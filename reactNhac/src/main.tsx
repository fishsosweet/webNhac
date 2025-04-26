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


const router = createBrowserRouter([
    {
        path: "/login-admin",
        element: <LoginPage/>,
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
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
