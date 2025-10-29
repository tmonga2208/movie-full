/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger
} from './ui/credenza'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'

const itemSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    imgUrl: z.string().url({ message: "Invalid image URL" }),
    description: z.string().min(1, { message: "Description is required" }),
    director: z.string().min(1, { message: "Director is required" }),
    rating: z.coerce
        .number()
        .min(0, { message: "Rating must be at least 0" })
        .max(10, { message: "Rating cannot exceed 10" }),
    userId: z.number(),
    releaseDate: z.string(),
    location: z
        .string()
        .optional()
        .refine((val) => !val || val.trim().length > 0, { message: "Location cannot be empty" }),

    budget: z
        .string()
        .optional()
        .refine((val) => !val || val.trim().length > 0, { message: "Budget cannot be empty" }),
})

type ItemFormData = z.infer<typeof itemSchema>

function MovieComp() {
    const [tab, setTab] = useState<'form' | 'json'>('form')
    const [jsonValue, setJsonValue] = useState('{}')
    const [isTV, setIsTV] = useState(false) // toggle between movie & tvshow

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ItemFormData>({
        resolver: zodResolver(itemSchema) as unknown as Resolver<ItemFormData>,
        defaultValues: { userId: 1 },
    })

    const onSubmit = async (data: ItemFormData) => {
        try {
            data.releaseDate = new Date(data.releaseDate).toISOString();
            const baseURL = 'https://movie-web-g1m4.onrender.com'
            const endpoint = isTV ? `${baseURL}/tvshows` : `${baseURL}/movies`

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error('Failed to add item')

            alert(`${isTV ? 'TV Show' : 'Movie'} added successfully!`)
            reset()
        } catch (err: any) {
            alert(err.message)
        }
    }

    const handleJsonSubmit = async () => {
        try {
            const parsed = JSON.parse(jsonValue)
            itemSchema.parse(parsed)
            await onSubmit(parsed)
            setJsonValue('{}')
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button><Plus /> Add</Button>
            </CredenzaTrigger>

            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Add Details</CredenzaTitle>
                    <CredenzaDescription>
                        Add via form or paste JSON. Toggle between Movie and TV Show.
                    </CredenzaDescription>
                </CredenzaHeader>

                <CredenzaBody>
                    <div className="flex items-center justify-between mb-4">
                        <Label>Type</Label>
                        <div className="flex items-center space-x-2">
                            <span>Movie</span>
                            <Switch
                                checked={isTV}
                                onCheckedChange={setIsTV}
                            />
                            <span>TV Show</span>
                        </div>
                    </div>

                    <Tabs value={tab} onValueChange={(v) => setTab(v as 'form' | 'json')}>
                        <TabsList className="mb-4">
                            <TabsTrigger value="form">Form</TabsTrigger>
                            <TabsTrigger value="json">JSON</TabsTrigger>
                        </TabsList>

                        {/* ---------- FORM TAB ---------- */}
                        <TabsContent value="form">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                <div>
                                    <Label>Title</Label>
                                    <Input {...register('title')} placeholder="Title" />
                                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                                </div>

                                <div>
                                    <Label>Image URL</Label>
                                    <Input {...register('imgUrl')} placeholder="https://..." />
                                    {errors.imgUrl && <p className="text-red-500 text-sm">{errors.imgUrl.message}</p>}
                                </div>

                                <div>
                                    <Label>Description</Label>
                                    <Textarea {...register('description')} />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                                </div>

                                <div>
                                    <Label>Director</Label>
                                    <Input {...register('director')} />
                                    {errors.director && <p className="text-red-500 text-sm">{errors.director.message}</p>}
                                </div>

                                <div>
                                    <Label>Rating (0–10)</Label>
                                    <Input type="number" step="0.1" {...register('rating', { valueAsNumber: true })} />
                                    {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
                                </div>

                                <div>
                                    <Label>Release Date</Label>
                                    <Input type="date" {...register('releaseDate')} />
                                    {errors.releaseDate && <p className="text-red-500 text-sm">{errors.releaseDate.message}</p>}
                                </div>

                                <div>
                                    <Label>Location</Label>
                                    <Input type="text" {...register('location')} />
                                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                                </div>

                                <div>
                                    <Label>Budget</Label>
                                    <Input type="text" {...register('budget')} />
                                    {errors.budget && <p className="text-red-500 text-sm">{errors.budget.message}</p>}
                                </div>

                                <Button type="submit" className="w-full">Add</Button>
                            </form>
                        </TabsContent>

                        {/* ---------- JSON TAB ---------- */}
                        <TabsContent value="json">
                            <Textarea
                                className="font-mono min-h-[250px]"
                                value={jsonValue}
                                onChange={(e) => setJsonValue(e.target.value)}
                                placeholder='Paste your JSON here'
                            />
                            <Button onClick={handleJsonSubmit} className="mt-3 w-full">Add via JSON</Button>
                        </TabsContent>
                    </Tabs>
                </CredenzaBody>

                <CredenzaFooter>
                    <CredenzaClose asChild>
                        <Button variant="secondary">Close</Button>
                    </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default MovieComp