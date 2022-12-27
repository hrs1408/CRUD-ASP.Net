import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import {ListUser} from "./components/ListUser";
import {Create} from "./components/Create";
import {Edit} from "./components/Edit";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/users',
    element: <ListUser />
  },
  {
    path: '/create',
    element: <Create />
  },
  {
    path: '/edit/:id',
    element: <Edit />
  }
];

export default AppRoutes;
