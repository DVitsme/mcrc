'use client'
import React from 'react';
import { Book, Menu, Sunset, Trees, Zap, User, ChevronDown } from "lucide-react";
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/lib/auth-context';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/images/logos/mcrc-logo.png",
    alt: "logo",
    title: "MCRC",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    {
      title: "Services",
      url: "/services",
      items: [
        {
          title: "Mediation",
          description: "Community, re-entry, family, Schools (Attendance, IEP)",
          icon: <Book className="size-5 shrink-0" />,
          url: "/services/mediation",
        },
        {
          title: "Facilitation",
          description: "Group Facilitation - Holding Space for Meaningful Conversations",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/services/facilitation",
        },
        {
          title: "Restorative Justice",
          description: "Restorative Reflections, Restorative Dialogues, Circles",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/services/restorative-justice",
        },
        {
          title: "Training & Education",
          description:
            "Helpful guides and tips that empower you!",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/services/training",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Forms and Files",
          description: "All the things you need to fill out before you get started.",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/resources/forms-and-files",
        },
        {
          title: "Volunteer",
          description: "We are always looking for talented people. Join our team!",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/resources/volunteer",
        },
        {
          title: "Donate",
          description: "Join our Giving Circle and help us service Howard County :)",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/resources/donate",
        },
        {
          title: "Guides",
          description: "Step by step guides to help you through the process.",
          icon: <Book className="size-5 shrink-0" />,
          url: "/resources/guides",
        },
      ],
    },
    {
      title: "Events",
      url: "/events",
    },
    {
      title: "Blog",
      url: "/blog",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ],
  mobileExtraLinks = [
    { name: "Press", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Imprint", url: "#" },
    { name: "Sitemap", url: "#" },
  ],
  auth = {
    login: { text: "Log in", url: "/signin" },
    signup: { text: "Sign up", url: "/signup" },
  },
}: Navbar1Props) => {
  const { user, profile } = useAuth();
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <section className="py-4">
      <div className="center-container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                className="w-8"
                alt={logo.alt}
                height={32}
                width={32}
              />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="-m-1.5 flex items-center p-1.5">
                        <span className="sr-only">Open user menu</span>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile?.avatar_url || '/images/default-avatar.png'} alt={profile?.full_name || user.email || 'User'} />
                          <AvatarFallback>
                            {(profile?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden lg:flex lg:items-center">
                          <span className="ml-4 text-sm font-semibold leading-6 text-foreground" aria-hidden="true">
                            {profile?.full_name || user.email || 'User'}
                          </span>
                          <ChevronDown className="ml-2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut}>
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button asChild size="sm">
                    <Link href="/dashboard">To Dashboard</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href={auth.login.url}>{auth.login.text}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.text}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                className="w-8"
                alt={logo.alt}
                height={32}
                width={32}
              />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <Image
                        src={logo.src}
                        className="w-8"
                        alt={logo.alt}
                        height={32}
                        width={32}
                      />
                      <span className="text-lg font-semibold">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                          href={link.url}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {user ? (
                      <>
                        <div className="flex items-center gap-2 py-2">
                          <User className="size-5" />
                          <span className="font-medium">{profile?.full_name || user.email || 'User'}</span>
                        </div>
                        <Button asChild>
                          <Link href="/dashboard">To Dashboard</Link>
                        </Button>
                        <Button variant="outline" onClick={handleSignOut}>
                          Sign out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <Link href={auth.login.url}>{auth.login.text}</Link>
                        </Button>
                        <Button asChild>
                          <Link href={auth.signup.url}>{auth.signup.text}</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="w-80 p-3">
            <ul className="space-y-1">
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <Link
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                    href={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
        href={item.url}
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
              href={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar1 };
