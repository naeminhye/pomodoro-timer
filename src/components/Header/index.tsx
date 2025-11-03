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
import { useTimerSettingsStore } from "@/store/timerSettingsStore";
import { useCallback } from "react";

function Header() {
    const setSettings = useTimerSettingsStore((state) => state.setSettings);
    const currentStoreState = useTimerSettingsStore.getState();

    const form = useForm({
        defaultValues: {
            focusTime: currentStoreState?.focusTime ?? 25,
            shortBreakTime: currentStoreState?.shortBreakTime ?? 5,
            longBreakTime: currentStoreState?.longBreakTime ?? 15,
            autoBreak: currentStoreState?.autoBreak ?? false,
            autoFocus: currentStoreState?.autoFocus ?? false,
            longBreakInterval: currentStoreState?.longBreakInterval ?? 4,
        },
        // validators: {
        //     onSubmit: formSchema,
        // },
        onSubmit: async ({ value }) => {
            console.log("Saving new settings:", value);

            const updates = {
                focusTime: value.focusTime,
                shortBreakTime: value.shortBreakTime,
                longBreakTime: value.longBreakTime,
                autoBreak: value.autoBreak,
                autoFocus: value.autoFocus,
                longBreakInterval: value.longBreakInterval,
            };

            // Call the batch update action
            setSettings(updates);
            console.log('Settings updated successfully!');
        },
    });

    const handleDismiss = () => {
        form.reset();
    }

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

                            <form.Field
                                name="autoBreak"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <div className="flex justify-between items-center">
                                                <FieldLabel htmlFor={field.name}>Auto Start Breaks</FieldLabel>
                                                <Switch
                                                    id={field.name}
                                                    name={field.name}
                                                    checked={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onCheckedChange={(checked) => field.handleChange(checked)} />
                                            </div>
                                        </Field>)
                                }} />

                            <form.Field
                                name="autoFocus"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <div className="flex justify-between items-center">
                                                <FieldLabel htmlFor={field.name}>Auto Start Focus</FieldLabel>
                                                <Switch
                                                    id={field.name}
                                                    name={field.name}
                                                    checked={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onCheckedChange={(checked) => field.handleChange(checked)} />
                                            </div>
                                        </Field>)
                                }} />

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
                                <Button variant="outline" onClick={handleDismiss}>Cancel</Button>
                            </DialogClose>
                            <Button variant="outline" form="setting-form" type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default Header
