import * as React from 'react';
import Link from 'next/link'
import { ListItemIcon, ListSubheader, ListItemText, ListItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import UploadIcon from '@mui/icons-material/Upload';


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

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Outros</ListSubheader>
    <Link href='/dashboard/imports' passHref>
      <ListItem button>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </Link>
  </div>
);