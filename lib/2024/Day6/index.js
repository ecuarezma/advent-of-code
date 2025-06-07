import { GuardPatrol, GuardObstacle } from "./class.js";

const guardRoute = new GuardPatrol("mock");
guardRoute.startPatrol();
guardRoute.getUniquePositions();
