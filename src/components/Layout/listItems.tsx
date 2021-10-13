import React, { useContext } from 'react'
import Link from 'next/link'
import { ListItemIcon, ListSubheader, ListItemText, ListItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import UploadIcon from '@mui/icons-material/Upload';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { AuthContext } from 'contexts/AuthContext';

export const mainListItems = (
  <div>
    <Link href='/dashboard' passHref>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link href='/dashboard/employees' passHref>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Funcionários" />
      </ListItem>
    </Link>
    <Link href='/dashboard/companies' passHref>
      <ListItem button>
        <ListItemIcon>
          <BuildCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Controles" />
      </ListItem>
    </Link>
    <Link href='/dashboard/imports' passHref>
      <ListItem button>
        <ListItemIcon>
          <UploadIcon />
        </ListItemIcon>
        <ListItemText primary="Importações" />
      </ListItem>
    </Link>
  </div>
);


export function SecondaryListItems() {
  const { singOut } = useContext(AuthContext);
  return (
    <div>
      <ListSubheader inset></ListSubheader>
      <Link href='' passHref>
        <ListItem button onClick={() => singOut()}>
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Link>
    </div>
  );
}
