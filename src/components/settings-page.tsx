'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import {
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Save,
    Trash2,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';

export function SettingsPage() {
    const { user } = useUser();
    const { toast } = useToast();

    // Settings state
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [weeklyDigest, setWeeklyDigest] = useState(true);
    const [ingredientAlerts, setIngredientAlerts] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');

    // Dietary preferences
    const [dietaryRestrictions, setDietaryRestrictions] = useState({
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        nutFree: false,
    });

    const handleSaveSettings = () => {
        toast({
            title: 'Settings Saved',
            description: 'Your preferences have been updated successfully.',
        });
    };

    const handleClearData = () => {
        toast({
            title: 'Data Cleared',
            description: 'Your analysis history has been cleared.',
            variant: 'destructive',
        });
    };

    const settingsSections = [
        {
            id: 'profile',
            title: 'Profile',
            icon: User,
            description: 'Manage your account information',
        },
        {
            id: 'notifications',
            title: 'Notifications',
            icon: Bell,
            description: 'Configure how you receive updates',
        },
        {
            id: 'dietary',
            title: 'Dietary Preferences',
            icon: Globe,
            description: 'Set your dietary restrictions and preferences',
        },
        {
            id: 'appearance',
            title: 'Appearance',
            icon: Palette,
            description: 'Customize the look and feel',
        },
        {
            id: 'privacy',
            title: 'Privacy & Security',
            icon: Shield,
            description: 'Manage your data and security settings',
        },
    ];

    return (
        <div className="min-h-screen main-content-bg pt-32 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(25, 30%, 15%)' }}>
                        Settings
                    </h1>
                    <p className="text-lg" style={{ color: 'hsl(25, 20%, 35%)' }}>
                        Manage your account preferences and app configuration
                    </p>
                </motion.div>

                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="mb-6 border-border bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(25, 30%, 15%)' }}>
                                        Profile Information
                                    </CardTitle>
                                    <CardDescription>Update your personal details</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        defaultValue={user?.fullName || ''}
                                        className="border-border focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        defaultValue={user?.primaryEmailAddress?.emailAddress || ''}
                                        className="border-border focus:border-primary"
                                        disabled
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Dietary Preferences */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="mb-6 border-border bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <CardTitle style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(25, 30%, 15%)' }}>
                                        Dietary Preferences
                                    </CardTitle>
                                    <CardDescription>Set your dietary restrictions for better recommendations</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(dietaryRestrictions).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <Label htmlFor={key} className="cursor-pointer capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </Label>
                                        <Switch
                                            id={key}
                                            checked={value}
                                            onCheckedChange={(checked) =>
                                                setDietaryRestrictions(prev => ({ ...prev, [key]: checked }))
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="mb-6 border-border bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <Bell className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <CardTitle style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(25, 30%, 15%)' }}>
                                        Notifications
                                    </CardTitle>
                                    <CardDescription>Configure how you receive updates</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div>
                                        <Label htmlFor="email-notif" className="cursor-pointer font-medium">Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive analysis results via email</p>
                                    </div>
                                    <Switch
                                        id="email-notif"
                                        checked={emailNotifications}
                                        onCheckedChange={setEmailNotifications}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div>
                                        <Label htmlFor="push-notif" className="cursor-pointer font-medium">Push Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Get instant alerts on your device</p>
                                    </div>
                                    <Switch
                                        id="push-notif"
                                        checked={pushNotifications}
                                        onCheckedChange={setPushNotifications}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div>
                                        <Label htmlFor="weekly-digest" className="cursor-pointer font-medium">Weekly Digest</Label>
                                        <p className="text-sm text-muted-foreground">Summary of your weekly analyses</p>
                                    </div>
                                    <Switch
                                        id="weekly-digest"
                                        checked={weeklyDigest}
                                        onCheckedChange={setWeeklyDigest}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div>
                                        <Label htmlFor="ingredient-alerts" className="cursor-pointer font-medium">Ingredient Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Alerts for concerning ingredients</p>
                                    </div>
                                    <Switch
                                        id="ingredient-alerts"
                                        checked={ingredientAlerts}
                                        onCheckedChange={setIngredientAlerts}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Appearance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="mb-6 border-border bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Palette className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(25, 30%, 15%)' }}>
                                        Appearance
                                    </CardTitle>
                                    <CardDescription>Customize the look and feel</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div>
                                    <Label htmlFor="dark-mode" className="cursor-pointer font-medium">Dark Mode</Label>
                                    <p className="text-sm text-muted-foreground">Switch to dark theme (Coming soon)</p>
                                </div>
                                <Switch
                                    id="dark-mode"
                                    checked={darkMode}
                                    onCheckedChange={setDarkMode}
                                    disabled
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <select
                                    id="language"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full p-2 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Privacy & Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="mb-6 border-border bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <CardTitle style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(25, 30%, 15%)' }}>
                                        Privacy & Security
                                    </CardTitle>
                                    <CardDescription>Manage your data and security settings</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between border-border hover:bg-muted"
                                    onClick={handleClearData}
                                >
                                    <div className="flex items-center gap-2">
                                        <Trash2 className="w-4 h-4 text-secondary" />
                                        <span>Clear Analysis History</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between border-border hover:bg-muted"
                                >
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-accent" />
                                        <span>Privacy Policy</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between border-border hover:bg-muted"
                                >
                                    <div className="flex items-center gap-2">
                                        <LogOut className="w-4 h-4 text-secondary" />
                                        <span>Sign Out</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Save Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-end gap-3"
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={handleSaveSettings}
                            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl shadow-md"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Settings
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
