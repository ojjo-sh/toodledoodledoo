import express from "express";
import setupTodoRoutes from "./todo.js"

const router = express.Router();

// Initialize /todo routes
setupTodoRoutes(router);

export default router;