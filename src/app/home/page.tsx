'use client'

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

type Todo = {
    id: string;
    task: string;
    completed: boolean;
};

const HomePage = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: '1', task: 'Excessive barking', completed: false },
        { id: '2', task: 'Pulling on leash', completed: true },
        { id: '3', task: 'Not listening to recall', completed: false },
    ]);
    const [newTask, setNewTask] = useState('');

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodos(items);
    };

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        setTodos([
            ...todos,
            {
                id: Date.now().toString(),
                task: newTask,
                completed: false,
            },
        ]);
        setNewTask('');
    };

    const toggleTodo = (id: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <>
            <Header />
            <main className="min-h-3.5 bg-background">
                <div className="p-8 max-w-4xl mx-auto">
                    <div className="items-center mt-6">
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">Here&apos;s an example list of dog behaviors.</p>
                    </div>
                    <form onSubmit={addTodo} className="flex gap-4 mt-6">
                        <Input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a new task..."
                            className="flex-1"
                        />
                        <Button type="submit">Add Task</Button>
                    </form>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="rounded-md border my-8">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12"></TableHead>
                                        <TableHead>Task</TableHead>
                                        <TableHead className="w-24">Status</TableHead>
                                        <TableHead className="w-24">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <Droppable droppableId="todos">
                                    {(provided) => (
                                        <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                                            {todos.map((todo, index) => (
                                                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                                    {(provided) => (
                                                        <TableRow
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="cursor-move"
                                                        >
                                                            <TableCell className="w-12">
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell className={todo.completed ? 'line-through text-gray-500' : ''}>
                                                                {todo.task}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Checkbox
                                                                    checked={todo.completed}
                                                                    onCheckedChange={() => toggleTodo(todo.id)}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => deleteTodo(todo.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </TableBody>
                                    )}
                                </Droppable>
                            </Table>
                        </div>
                    </DragDropContext>
                </div>
            </main >
            <Footer />
        </>
    );
};

export default HomePage;