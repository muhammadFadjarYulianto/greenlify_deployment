import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
import React from "react";

export default function ProductSkeleton() {
    return (
        <Card className="w-full">
            <div className="rounded-md overflow-hidden">
                <Skeleton className="w-full h-96 object-cover"/>
            </div>
            <CardHeader className="space-y-4">
                <Skeleton className="h-8 w-48 rounded-md"/>
                <Skeleton className="h-6 w-32 rounded-md"/>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    <Skeleton className="h-4 w-full mb-2 rounded-md"/>
                    <Skeleton className="h-4 w-5/6 rounded-md"/>
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full rounded-md"/>
            </CardFooter>
        </Card>
    )
}