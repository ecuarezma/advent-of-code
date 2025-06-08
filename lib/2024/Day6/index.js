import { GuardPatrol, GuardObstacle } from "./class.js";

// const guardRoute = new GuardPatrol("input");
// guardRoute.startPatrol();
// guardRoute.getUniquePositions();

const guardObstacle = new GuardObstacle("mock");
guardObstacle.startPatrol();
guardObstacle.setInitialPosition();
guardObstacle.printGrid();
