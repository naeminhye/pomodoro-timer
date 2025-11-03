import { useForm } from "@tanstack/react-form"

import { AlarmClockCheck, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

function Header() {
    const form = useForm({
        defaultValues: {
            focusTime: 25,
            shortBreakTime: 5,
            longBreakTime: 15,
            autoBreak: false,
            autoFocus: false,
            longBreakInterval: 4,
        },
        // validators: {
        //     onSubmit: formSchema,
        // },
        onSubmit: async ({ value }) => {
            console.log("value", value)
        },
    })


    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2 justify-center items-center"><AlarmClockCheck /><span className="font-bold text-xl">Pomodoro</span></div>
            <Dialog>
                <form id="setting-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full"><Settings /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="uppercase font-bold">Setting</DialogTitle>
                        </DialogHeader>
                        <FieldGroup>
                            <Label>Time (minutes)</Label>
                            <div className="grid grid-cols-3 gap-4">
                                <form.Field
                                    name="focusTime"
                                    children={(field) => {
                                        return (
                                            <Field>
                                                <div className="grid gap-3">
                                                    <FieldLabel className="font-light" htmlFor={field.name}>Focus</FieldLabel>
                                                    <Input id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e: any) => field.handleChange(e.target.value)}
                                                        type="number" step={1} min={0} />
                                                </div>
                                            </Field>)
                                    }} />

                                <form.Field
                                    name="shortBreakTime"
                                    children={(field) => {
                                        return (
                                            <Field>
                                                <div className="grid gap-3">
                                                    <FieldLabel className="font-light" htmlFor={field.name}>Short Break</FieldLabel>
                                                    <Input id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e: any) => field.handleChange(e.target.value)}
                                                        type="number" step={1} min={0} />
                                                </div>
                                            </Field>)
                                    }} />
                                <form.Field
                                    name="longBreakTime"
                                    children={(field) => {
                                        return (
                                            <Field>
                                                <div className="grid gap-3">
                                                    <FieldLabel className="font-light" htmlFor={field.name}>Short Break</FieldLabel>
                                                    <Input id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e: any) => field.handleChange(e.target.value)}
                                                        type="number" step={1} min={0} />
                                                </div>
                                            </Field>)
                                    }} />
                            </div>

                            <div className="flex justify-between items-center">
                                <Label htmlFor="auto-start-breaks">Auto Start Breaks</Label>
                                <Switch id="auto-start-breaks" name="autoBreak" />
                            </div>
                            <div className="flex justify-between items-center">
                                <Label htmlFor="auto-start-focus">Auto Start Focus</Label>
                                <Switch id="auto-start-focus" name="autoFocus" />
                            </div>

                            <form.Field
                                name="longBreakInterval"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <div className="flex justify-between items-center">
                                                <FieldLabel htmlFor={field.name}>Long Break interval</FieldLabel>
                                                <Input id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e: any) => field.handleChange(e.target.value)}
                                                    className="w-24" type="number" step={1} min={1} />
                                            </div>
                                        </Field>)
                                }} />
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button variant="outline" type="submit" form="setting-form">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default Header
