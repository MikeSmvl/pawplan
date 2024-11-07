'use client'

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, ArrowUpCircle } from "lucide-react";
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

type Todo = {
    id: string;
    behavior: string;
    completed: boolean;
};

const HomePage = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: '1', behavior: 'Excessive barking', completed: false },
        { id: '2', behavior: 'Pulling on leash', completed: true },
        { id: '3', behavior: 'Not listening to recall', completed: false },
    ]);
    const [newBehavior, setNewBehavior] = useState('');

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodos(items);
    };

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBehavior.trim()) return;

        setTodos([
            ...todos,
            {
                id: Date.now().toString(),
                behavior: newBehavior,
                completed: false,
            },
        ]);
        setNewBehavior('');
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
                    <form onSubmit={addTodo} className="relative mt-6">
                        <Input
                            type="text"
                            value={newBehavior}
                            onChange={(e) => setNewBehavior(e.target.value)}
                            placeholder="Add a new behavior..."
                            className="pr-12"
                        />
                        {newBehavior.trim() && (
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 transition-opacity"
                            >
                                <ArrowUpCircle className="h-4 w-4" />
                            </Button>
                        )}
                    </form>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="rounded-md border my-8">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12"></TableHead>
                                        <TableHead>Behavior</TableHead>
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
                                                                {todo.behavior}
                                                            </TableCell>
                                                            <TableCell className="align-middle">
                                                                <div className="flex items-center h-9 w-9 justify-center">
                                                                    <Checkbox
                                                                        checked={todo.completed}
                                                                        onCheckedChange={() => toggleTodo(todo.id)}
                                                                    />
                                                                </div>
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
            </main>
            <Footer />
        </>
    );
};

export default HomePage;