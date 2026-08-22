"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "pt" | "es";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

const translations = {
	en: {
		// Navigation
		"nav.features": "Features",
		"nav.integrations": "Integrations",
		"nav.pricing": "Pricing",
		"nav.reviews": "Reviews",
		"nav.dashboard": "Dashboard",
		"nav.blog": "Blog",
		"nav.signin": "Sign In",
		"nav.getstarted": "Get Started",

		// Footer / About / Contact / Consent
		"footer.tagline":
			"The best way to organize, manage, and share your YouTube subscriptions.",
		"footer.resources": "Resources",
		"footer.helpcenter": "Help Center",
		"footer.community": "Community",
		"footer.contact": "Contact",
		"footer.about": "About",
		"footer.privacy": "Privacy Policy",
		"footer.terms": "Terms of Service",
		"about.badge": "About us",
		"about.title": "About Groupify",
		"about.subtitle":
			"We help YouTube lovers tame their subscriptions: organize channels into groups, curate what to watch and share it all with friends.",
		"about.mission.title": "Our mission",
		"about.mission.text":
			"YouTube is the biggest video library in the world, but managing hundreds of channels is a mess. Groupify gives every channel a home: create groups for animes, news, fitness, cooking or anything else, keep them organized over time and share a single link instead of a wall of recommendations.",
		"about.story.title": "Why we built it",
		"about.story.text":
			"Groupify started as a personal need: too many subscriptions, too many “watch later” piles and no good way to hand a curated set of channels to a friend. Today it is a full dashboard where you can connect your account, group your channels, sync their latest videos and share public links with anyone.",
		"about.values.title": "What we care about",
		"about.value1.title": "Organization first",
		"about.value1.desc":
			"Groups are the core of the product. Simple to build, easy to reorder and always in sync with your channel list.",
		"about.value2.title": "Sharing built-in",
		"about.value2.desc":
			"Every group can become a public share link, so your curation reaches friends and followers without friction.",
		"about.value3.title": "Privacy respected",
		"about.value3.desc":
			"Clear cookie choices, non-personalized ads by default until you opt in, and easy ways to contact us about your data.",
		"about.cta.title": "Ready to organize your channels?",
		"about.cta.text":
			"Create your free account and build your first group in minutes — or read the blog for tips on curating your YouTube life.",
		"contact.badge": "Contact",
		"contact.title": "Get in touch",
		"contact.subtitle":
			"Questions, feedback or partnership ideas? We usually answer within one business day.",
		"contact.email.title": "Email us",
		"contact.email.desc":
			"Write to our team directly for support, billing or privacy requests.",
		"contact.email.button": "Send email",
		"contact.community.title": "Discord community",
		"contact.community.desc":
			"Chat with other users, report bugs and follow product updates in real time.",
		"contact.community.button": "Join Discord",
		"contact.help.title": "Help center",
		"contact.help.desc":
			"Browse guides and answers to the most common questions about Groupify.",
		"contact.help.button": "Open help center",
		"contact.response":
			"For privacy-specific requests (data access, correction or deletion), email us and we will respond within 30 days as required by applicable law.",
		"consent.title": "Cookies & ads",
		"consent.text":
			"We use cookies for essential site functions and analytics. With your consent we also show personalized ads via Google AdSense; without it, ads remain non-personalized.",
		"consent.accept": "Accept all",
		"consent.reject": "Non-personalized only",
		"consent.learnMore": "Privacy policy",

		// Login Page
		"login.welcome": "Welcome back! Please sign in to your account.",
		"login.title": "Sign In",
		"login.subtitle": "Enter your email and password to access your dashboard",
		"login.description":
			"Enter your email and password to access your dashboard",
		"login.email": "Email",
		"login.email.placeholder": "Enter your email",
		"login.password": "Password",
		"login.password.placeholder": "Enter your password",
		"login.forgot": "Forgot your password?",
		"login.signin": "Sign In",
		"login.signing": "Signing in...",
		"login.or": "Or continue with",
		"login.google": "Sign in with Google",
		"login.discord": "Sign In with Discord",
		"login.github": "GitHub",
		"login.noaccount": "Don't have an account?",
		"login.signup": "Sign up",
		"login.backhome": "Back to home",
		"login.demo": "Demo credentials:",
		"login.demo.email": "Email: demo@example.com",
		"login.demo.password": "Password: password",
		"login.validation.email.required": "Email is required",
		"login.validation.email.invalid": "Please enter a valid email address",
		"login.validation.password.required": "Password is required",
		"login.validation.password.min":
			"Password must be at least 6 characters long",

		// Forgot Password Page
		"forgot.title": "Reset Password",
		"forgot.description":
			"Enter your email address and we'll send you a link to reset your password.",
		"forgot.email": "Email",
		"forgot.email.placeholder": "Enter your email address",
		"forgot.send": "Send Reset Link",
		"forgot.sending": "Sending...",
		"forgot.error": "Failed to send reset email. Please try again.",
		"forgot.backsignin": "Back to Sign In",
		"forgot.success.title": "Check Your Email",
		"forgot.success.description": "We've sent a password reset link to",
		"forgot.success.next.title": "What's next?",
		"forgot.success.next.step1": "1. Check your email inbox",
		"forgot.success.next.step2": "2. Click the reset link in the email",
		"forgot.success.next.step3": "3. Create a new password",
		"forgot.success.noemail.title": "Didn't receive the email?",
		"forgot.success.noemail.description":
			"Check your spam folder or try resending the email.",
		"forgot.success.resend": "Resend Email",
		"forgot.success.backsignin": "Back to Sign In",

		// Hero Section
		"hero.badge": "New: Crunchyroll Integration",
		"hero.title": "Organize Your YouTube Channels Like a Pro",
		"hero.subtitle":
			"Organize your YouTube channels with custom groups, collaborate with your team, and access powerful analytics — all in one sleek dashboard.",
		"hero.starttrial": "Start Free Trial",
		"hero.watchdemo": "Watch Demo",
		"hero.freetrial": "Free 14-day trial",
		"hero.nocreditcard": "No credit card required",
		"hero.cancelanytime": "Cancel anytime",

		// Stats
		"stats.activeusers": "Active Users",
		"stats.channelsmanaged": "Channels Managed",
		"stats.groupscreated": "Groups Created",
		"stats.uptime": "Uptime",

		// Features
		"features.badge": "Features",
		"features.title": "Everything You Need",
		"features.subtitle":
			"Powerful features designed to help you manage, organize, and grow your YouTube channel portfolio.",
		"features.smartorg.title": "Smart Group Organization",
		"features.smartorg.desc":
			"Create hierarchical groups with custom icons and organize your YouTube channels efficiently.",
		"features.collaboration.title": "Collaboration & Sharing",
		"features.collaboration.desc":
			"Share groups with team members, set permissions, and collaborate on channel management.",
		"features.analytics.title": "Advanced Analytics",
		"features.analytics.desc":
			"Track subscriber growth, view statistics, and analyze channel performance with detailed charts.",
		"features.youtube.title": "YouTube API Integration",
		"features.youtube.desc":
			"Automatically sync channel data, subscriber counts, and video statistics in real-time.",
		"features.team.title": "Team Management",
		"features.team.desc":
			"Invite collaborators with different permission levels and manage access to your groups.",
		"features.responsive.title": "Responsive Design",
		"features.responsive.desc":
			"Access your dashboard from any device with our fully responsive and mobile-optimized interface.",
		"features.integrated.title": "Integrated UI",
		"features.integrated.desc":
			"Access the groups directly from the Youtube and Crunchyroll website",

		"register.welcome":
			"Create your account and start organizing your YouTube channels.",
		"register.title": "Create Account",
		"register.description": "Enter your details to create your account",
		"register.name": "Full Name",
		"register.name.placeholder": "Enter your full name",
		"register.email": "Email",
		"register.email.placeholder": "Enter your email",
		"register.password": "Password",
		"register.password.placeholder": "Create a password",
		"register.confirmpassword": "Confirm Password",
		"register.confirmpassword.placeholder": "Confirm your password",
		"register.terms": "I agree to the",
		"register.terms.link": "Terms of Service",
		"register.privacy": "and",
		"register.privacy.link": "Privacy Policy",
		"register.signup": "Sign Up",
		"register.signing": "Creating account...",
		"register.or": "Or continue with",
		"register.google": "Google",
		"register.discord": "Discord",
		"register.hasaccount": "Already have an account?",
		"register.signin": "Sign In",
		"register.backhome": "Back to Home",
		"register.validation.name.required": "Full name is required",
		"register.validation.name.min": "Name must be at least 2 characters long",
		"register.validation.email.required": "Email is required",
		"register.validation.email.invalid": "Please enter a valid email address",
		"register.validation.password.required": "Password is required",
		"register.validation.password.min":
			"Password must be at least 6 characters long",
		"register.validation.confirmpassword.required":
			"Please confirm your password",
		"register.validation.confirmpassword.match": "Passwords do not match",

		// Integrations
		"integrations.badge": "Integrations",
		"integrations.title": "Powerful Integrations",
		"integrations.subtitle":
			"Connect with your favorite platforms and tools to supercharge your workflow.",
		"integrations.crunchyroll.desc": "Track anime content across platforms",
		"integrations.youtube.desc": "Real-time channel data synchronization",
		"integrations.export.desc":
			"A place to export your groups and channels to the community",

		// Landing Page - New Content
		"landing.hero.badge": "YouTube Channel Organizer + Browser Extension",
		"landing.hero.title":
			"Groupify — The Ultimate YouTube Channel Organizer & Subscription Manager",
		"landing.hero.subtitle":
			"Manage your YouTube subscriptions with Groupify, the smart YouTube channel management tool for content creators and teams. Organize channels into custom groups, collaborate, and never lose track of a video again.",
		"landing.hero.cta.primary": "Try Groupify Free",
		"landing.hero.cta.secondary": "Watch Demo",
		"landing.hero.trust1": "No credit card required",
		"landing.hero.trust2": "14-day free trial",
		"landing.hero.trust3": "Cancel anytime",
		"landing.hero.preview": "Groupify Dashboard Preview",

		// Landing Page - Features Section
		"landing.features.title":
			"Everything You Need to Organize YouTube Channels & Subscriptions",
		"landing.features.subtitle":
			"Powerful content creator tools for managing, curating, and sharing your YouTube subscriptions with ease.",
		"landing.features.smart.title": "Smart YouTube Organization",
		"landing.features.smart.desc":
			"Create unlimited custom groups with nested categories to organize channels by topic, creator, or any system you choose. The ultimate YouTube channel organizer for a clutter-free subscription feed.",
		"landing.features.share.title": "Share & Collaborate",
		"landing.features.share.desc":
			"Generate shareable group links so teams and communities can view or copy curated channel collections. Perfect for collaborative YouTube channel management and content curation.",
		"landing.features.permissions.title": "Team Permissions",
		"landing.features.permissions.desc":
			"Assign view-only, editor, or admin roles to control who can modify your groups. Granular team permissions make Groupify the ideal YouTube channel management tool for agencies and studios.",
		"landing.features.bulk.title": "Bulk Operations",
		"landing.features.bulk.desc":
			"Add, remove, or move multiple YouTube channels across groups in seconds. Powerful batch actions save hours of manual YouTube subscription management.",
		"landing.features.extension.title": "Browser Extension",
		"landing.features.extension.desc":
			"Add YouTube channels to any group with one click using our browser extension. Seamless YouTube channel organizer integration for Chrome, Firefox, and Safari.",
		"landing.features.everywhere.title": "Works Everywhere",
		"landing.features.everywhere.desc":
			"Access your organized YouTube channels from any device. Web app plus browser extensions keep your YouTube subscription manager always within reach.",

		// Landing Page - Browser Extension Section
		"landing.extension.badge": "YouTube Browser Extension",
		"landing.extension.title":
			"Save YouTube Channels to Groups While You Browse",
		"landing.extension.subtitle":
			"Our browser extension integrates directly with YouTube. When you discover a channel you want to follow, click the Groupify icon and add it to any group without leaving the page. The easiest YouTube channel organizer for everyday browsing.",
		"landing.extension.success": "Channel added to group",
		"landing.extension.subscribers": "subscribers",

		// Landing Page - Testimonials Section
		"landing.testimonials.title": "Loved by Content Creators",
		"landing.testimonials.subtitle":
			"See why thousands trust Groupify as their YouTube channel management tool",
		"landing.testimonials.alex.content":
			"Groupify completely changed how I manage my YouTube subscriptions. I keep my educational research separate from casual watching — it's the YouTube channel organizer I always needed.",
		"landing.testimonials.sarah.content":
			"Our team shares curated YouTube playlists daily using Groupify. The collaboration features and granular permissions make it the best YouTube channel management tool for agencies.",
		"landing.testimonials.mike.content":
			"As a creator with dozens of niche interests, Groupify helps me manage my YouTube subscriptions better than anything else. The nested groups feature is a lifesaver for staying organized.",

		// Landing Page - Pricing Section
		"landing.pricing.title": "Simple, Transparent Pricing",
		"landing.pricing.subtitle":
			"Start organizing your YouTube subscriptions today. Every plan includes a 14-day free trial.",
		"landing.pricing.free.name": "Free",
		"landing.pricing.free.desc":
			"Perfect for getting started with YouTube channel organization",
		"landing.pricing.pro.name": "Pro",
		"landing.pricing.pro.desc":
			"Best for content creators who need advanced YouTube subscription management",
		"landing.pricing.business.name": "Business",
		"landing.pricing.business.desc":
			"For teams and agencies managing multiple YouTube channel collections",
		"landing.pricing.cta.free": "Start Organizing Free",
		"landing.pricing.cta.pro": "Try Groupify Pro Free",
		"landing.pricing.cta.business": "Get Business",
		"landing.pricing.mostpopular": "MOST POPULAR",

		// Landing Page - CTA Section
		"landing.cta.title": "Take Control of Your YouTube Subscriptions",
		"landing.cta.subtitle":
			"Join thousands of content creators and teams who use Groupify — the smart YouTube channel organizer for managing, curating, and sharing subscriptions.",
		"landing.cta.primary": "Start Organizing Free",
		"landing.cta.secondary": "Join Community",

		// Testimonials
		"testimonials.badge": "Testimonials",
		"testimonials.title": "Loved by Creators",
		"testimonials.subtitle":
			"See what content creators and agencies are saying about Groupify.",
		"testimonials.alex.content":
			"This tool has revolutionized how I manage my 50+ YouTube channels. The grouping feature is a game-changer!",
		"testimonials.sarah.content":
			"Perfect for our agency. We can now organize client channels efficiently and share access with team members.",
		"testimonials.mike.content":
			"The analytics dashboard gives me insights I never had before. Highly recommend for serious creators.",

		// Pricing
		"pricing.badge": "Pricing",
		"pricing.title": "Simple, Transparent Pricing",
		"pricing.subtitle":
			"Choose the plan that's right for you. Upgrade or downgrade at any time.",
		"pricing.popular": "Most Popular",
		"pricing.free.name": "Free",
		"pricing.free.desc": "Perfect for getting started",
		"pricing.pro.name": "Basic",
		"pricing.pro.desc": "For serious content creators",
		"pricing.business.name": "Pro",
		"pricing.business.desc": "For agencies and teams",
		"pricing.getstarted": "Get Started",
		"pricing.starttrial": "Start Free Trial",
		"pricing.contactsales": "Contact Sales",

		// CTA
		"cta.badge": "Ready to Launch",
		"cta.title": "Ready to Get Started?",
		"cta.subtitle":
			"Join thousands of content creators who are already using Groupify to organize and grow their YouTube presence.",

		share_link_generated_success_description:
			"Share link generated successfully",

		// Footer

		// Collaborate Invite
		collaborate_invite_title: "Invite Collaborators",
		default_permission_title: "Default Permission",
		share_link_title: "Share Link",
		join_as: "Anyone with this link will join as a {role} permission.",
		copy_link_title: "Copy Group Link",
		copy_link_desc:
			"Share this link with others to allow them to copy this group's channels.",
		copy_destination_title: "Copy Destination",
		copy_destination_new: "A new group",
		copy_destination_existing: "An existing group",
		copy_alert_desc:
			"This will copy {count} channels to the selected destination.",
		copy_alert_info:
			"This link allows others to copy the channels to their own groups.",
		generate_copy_link: "Generate Copy Link",
		group_details_title: "Group Details",
		channels: "Channels",
		share_settings_title: "Share Settings",
		share_settings_collab:
			"Collaborators will have {permission} access to this group.",
		share_settings_copy:
			"Recipients will be able to copy all channels to {destination}.",
		destination_new: "a new group",
		destination_existing: "an existing group",
		share_group_title: "Share Group",
		share_group_description: "Share your group with others",
		back_to_group: "Back to Group",
		collaborate_tab_title: "Collaborate",
		copy_group_tab_title: "Copy Group",
		collaborate_invite_desc:
			"Invite collaborators to this group by entering their email address and assigning a role.",
		input_email_placeholder: "Enter collaborator's email",
		collaborators_label: "Collaborators",
		collaborators_empty: "No collaborators yet.",
		role_viewer: "Viewer",
		role_editor: "Editor",
		role_admin: "Admin",
		perm_view: "Can view group content",
		perm_edit: "Can edit group content",
		perm_admin: "Full administrative access",
		allow_comments_label: "Allow comments",
		share_link_desc:
			"Share this link with others to allow them to view or copy this group.",
		copied: "Copied!",
		copy: "Copy",
		generating: "Generating...",
		generate_link: "Generate Copy Link",
		add: "Add",
		"footer.description":
			"The ultimate tool for organizing and managing your YouTube channel portfolio with modern design and powerful features.",
		"footer.product": "Product",
		"footer.support": "Support",
		"footer.company": "Company",
		"footer.copyright":
			"All rights reserved. Built with ❤️ for content creators.",

		// Dashboard
		"dashboard.greeting.morning": "Good morning",
		"dashboard.greeting.afternoon": "Good afternoon",
		"dashboard.greeting.evening": "Good evening",
		"dashboard.greeting.subtitle":
			"Here's what's happening with your groups today",
		"dashboard.quickactions": "Quick Actions",
		"dashboard.create.group": "Create Group",
		"dashboard.create.group.desc": "Organize channels",
		"dashboard.view.channels": "View Channels",
		"dashboard.view.channels.desc": "Manage all",
		"dashboard.share.links": "Share Links",
		"dashboard.share.links.desc": "Manage access",
		"dashboard.upgrade.plan": "Upgrade Plan",
		"dashboard.upgrade.plan.desc": "Get more features",
		"dashboard.overview": "Overview",
		"dashboard.yourgroups": "Your Groups",
		"dashboard.tab.groups": "Groups",
		"dashboard.tab.shared": "Shared",
		"dashboard.recent.title": "Recent Groups",
		"dashboard.recent.features": "Recent Features",
		"dashboard.recent.all": "All",
		"dashboard.shared.title": "Shared Groups",
		"dashboard.shared.access": "Shared Access",
		"dashboard.shared.subtitle": "Groups shared with you",

		// Groups
		"groups.title": "Groups",
		"groups.description": "Manage your YouTube channel groups",
		"groups.new": "New Group",
		"groups.loading": "Loading groups...",
		"groups.error.title": "Error Loading Groups",
		"groups.error.description": "Failed to load groups. Please try again.",

		// Group Form
		"group.form.name": "Name",
		"group.form.name.placeholder": "My Group",
		"group.form.description": "Description",
		"group.form.description.placeholder": "What's this group about?",
		"group.form.category": "Category",
		"group.form.icon": "Icon",
		"group.form.parent": "Parent Group (Optional)",
		"group.form.parent.none": "None (top-level)",
		"group.form.parent.hint": "Create subgroups to organize hierarchically",
		"group.form.cancel": "Cancel",
		"group.form.creating": "Creating...",
		"group.form.submit": "Submit",
		"group.form.shelf": "Enable Group Shelf",
		"group.form.validation.required": "Required",
		"group.form.validation.max50": "Max 50 chars",
		"group.form.validation.pattern":
			"Only letters, numbers, spaces, hyphens, underscores",
		"group.form.category.placeholder": "Select a category",
		"group.form.icon.placeholder": "Select an icon",

		// Blog
		"blog.title": "Latest Updates",
		"blog.brand": "Groupify Blog",
		"blog.search": "Search...",
		"blog.featured": "Featured",
		"blog.trending": "Trending",
		"blog.read": "Read Article",
		"blog.author.team": "Equipe Groupify",
		"blog.results": "Results",
		"blog.allposts": "All Posts",
		"blog.none.title": "No posts found",
		"blog.none.description": "No posts in this category.",
		"blog.prev": "Previous",
		"blog.next": "Next",
		"blog.category.all": "All",
		"blog.category.product": "Product",
		"blog.category.engineering": "Engineering",
		"blog.category.design": "Design",
		"blog.category.community": "Community",
		"blog.category.tutorials": "Tutorials",

		// Not Found
		"notfound.description": "The page you are looking for does not exist.",
		"notfound.goback": "Go back",
		"notfound.startover": "Start Over",

		// Sidebar
		"sidebar.dashboard": "Dashboard",
		"sidebar.groups": "Groups",
		"sidebar.channels": "Channels",
		"sidebar.animes": "Animes",
		"sidebar.websites": "Websites",
		"sidebar.settings": "Settings",

		// Social Login Labels
		"login.welcome.badge": "Welcome back",
		"register.welcome.badge": "Join Groupify",
		"login.social.google": "Google",
		"login.social.discord": "Discord",

		// Channels
		"channels.add.search": "Search",
		"channels.add.fetching": "Fetching...",
		"channels.add.fetch": "Fetch",
		"channels.add.added": "Added",
		"channels.add.add": "Add",
		"groupshelf.title": "Groupshelf",

		// Videos
		"videos.all.channels": "All channels",

		// Share Links
		"sharelinks.noexpiration": "No expiration",
		"sharelinks.unknown": "Unknown",

		// Groups Table
		"groups.table.search": "Search groups...",
		"groups.table.name": "Name",
		"groups.table.category": "Category",
		"groups.table.channels": "Channels",
		"groups.table.created": "Created",
		"groups.table.actions": "Actions",
		"groups.table.loading": "Loading groups...",
		"groups.table.noresults": 'No groups match "{search}"',
		"groups.table.noresults.hint": "Try adjusting your search terms",
		"groups.table.empty": "No groups found",
		"groups.table.subgroup": "(subgroup)",
		"groups.table.addsubgroup.sr": "Add subgroup",
		"groups.table.openmenu": "Open menu",
		"groups.table.viewdetails": "View details",
		"groups.table.edit": "Edit",
		"groups.table.addsubgroup.menu": "Add Subgroup",
		"groups.table.moveup": "Move Up",
		"groups.table.movedown": "Move Down",
		"groups.table.delete": "Delete",
		"groups.table.itemsperpage": "Items per page:",
		"groups.table.updated": "Group order updated",
		"groups.table.updated.desc": "The group order has been saved",
		"groups.table.update.error": "Failed to update group order",
		"groups.table.update.error.desc": "Please try again later",
		"groups.table.delete.confirm":
			'Are you sure you want to delete "{name}"? This action cannot be undone.',
		"groups.table.deleted": "Group deleted successfully",
		"groups.table.deleted.desc": '"{name}" has been deleted.',
		"groups.table.delete.error": "Failed to delete group",
		"groups.table.delete.error.desc": "Please try again later.",
		"groups.table.moved": "Group moved",
		"groups.table.moved.desc": "{name} moved {direction}",
		"groups.table.move.error": "Failed to move group",
		"groups.table.move.error.desc": "Please try again later",

		// Channels Table
		"channels.table.search": "Search channels...",
		"channels.table.channel": "Channel",
		"channels.table.actions": "Actions",
		"channels.table.empty": "No channels found.",
		"channels.table.visit": "Visit channel",
		"channels.table.remove": "Remove from group",
		"channels.table.visit.short": "Visit",
		"channels.table.remove.short": "Remove",
		"channels.table.sort.recent": "Recently Added",
		"channels.table.sort.nameaz": "Name (A to Z)",
		"channels.table.sort.nameza": "Name (Z to A)",
		"channels.table.view.grid": "Grid view",
		"channels.table.view.list": "List view",
		"channels.table.view.compact": "Compact view",
		"channels.table.openmenu": "Open menu",

		// All Channels
		"all.channels.search": "Search channels or groups...",
		"all.channels.error": "Error loading channels: {message}",
		"all.channels.channel": "Channel",
		"all.channels.group": "Group",
		"all.channels.actions": "Actions",
		"all.channels.loading": "Loading channels...",
		"all.channels.empty": "No channels found.",
		"all.channels.assign": "Assign Group",
		"all.channels.visit": "Visit channel",
		"all.channels.changegroup": "Change group",
		"all.channels.delete": "Delete channel",
		"all.channels.itemsperpage": "Items per page",
		"all.channels.itemsPerPagePlaceholder": "Items per page",
		"all.channels.openmenu": "Open menu",
		"all.channels.notfound": "No channels found",
		"all.channels.sync":
			"Sync your Google account to import your YouTube channels.",
		"all.channels.sync.link": "Go to settings",
		"all.channels.syncDescription": "Sync your Google account to",

		// All Animes
		"all.animes.search": "Search animes...",
		"all.animes.error": "Error loading channels: {message}",
		"all.animes.channel": "Channel",
		"all.animes.group": "Group",
		"all.animes.actions": "Actions",
		"all.animes.loading": "Loading channels...",
		"all.animes.empty": "No animes found.",
		"all.animes.assign": "Assign Group",
		"all.animes.visit": "Visit anime",
		"all.animes.changegroup": "Change group",
		"all.animes.delete": "Delete channel",
		"all.animes.itemsperpage": "Items per page",
		"all.animes.itemsPerPagePlaceholder": "Items per page",
		"all.animes.openmenu": "Open menu",

		// All Websites
		"all.websites.search": "Search websites...",
		"all.websites.error": "Error loading websites.",
		"all.websites.website": "Website",
		"all.websites.url": "URL",
		"all.websites.group": "Group",
		"all.websites.actions": "Actions",
		"all.websites.loading": "Loading...",
		"all.websites.empty": "No websites found.",
		"all.websites.visit": "Visit website",
		"all.websites.delete": "Delete",
		"all.websites.openmenu": "Open menu",

		// Group Details
		"group.details.shelf": "Group Shelf",
		"group.details.edit": "Edit Group",
		"group.details.share": "Share",
		"group.details.addchannel": "Add Channel",
		"group.details.created": "Created",
		"group.details.channels": "Channels",

		// Group List
		"group.list.empty.title": "No groups yet",
		"group.list.empty.desc":
			"Start organizing your YouTube channels into groups",
		"group.list.create": "Create Your First Group",
		"group.list.channels": "{count} channels",

		// Dashboard Stats
		"stats.total.groups": "Total Groups",
		"stats.total.channels.groups": "Total Channels inside Groups",
		"stats.shared.groups": "Shared Groups",
		"stats.total.youtube": "Total Youtube Channels",
		"stats.total.anime": "Total Anime Channels",

		// Recent Activity
		"recent.feature.organize.title": "Organize with Groups",
		"recent.feature.organize.desc":
			"Create unlimited groups to organize your YouTube channels by topic, project, or any criteria you need.",
		"recent.feature.organize.badge": "Core Feature",
		"recent.feature.share.title": "Share & Collaborate",
		"recent.feature.share.desc":
			"Generate share links to let others view or copy your groups. Perfect for teams and communities.",
		"recent.feature.share.badge": "Popular",
		"recent.feature.permissions.title": "Team Permissions",
		"recent.feature.permissions.desc":
			"Control access with view, edit, or admin permissions. Manage who can modify your groups.",
		"recent.feature.permissions.badge": "Pro",
		"recent.feature.bulk.title": "Bulk Operations",
		"recent.feature.bulk.desc":
			"Add, remove, or move multiple channels at once. Save time with powerful batch actions.",
		"recent.feature.extension.title": "Extension Integration",
		"recent.feature.extension.desc":
			"Use our browser extension to quickly add channels while browsing YouTube directly.",
		"recent.feature.extension.badge": "New",
		"recent.tip.title": "Pro Tip",
		"recent.tip.desc":
			"Use subgroups to create nested hierarchies. Perfect for organizing large collections by sub-topic or project phase.",

		// Recommendation Cards
		"rec.crunchyroll.badge": "New Integration",
		"rec.crunchyroll.anime": "Anime",
		"rec.crunchyroll.title": "Crunchyroll Integration",
		"rec.crunchyroll.desc":
			"Seamlessly combine YouTube and Crunchyroll anime content",
		"rec.crunchyroll.overlay": "The ultimate anime tracking experience",
		"rec.crunchyroll.unlock": "Unlock the full anime experience",
		"rec.crunchyroll.feature1": "Track anime across both platforms",
		"rec.crunchyroll.feature2": "Control all your collections",
		"rec.crunchyroll.feature3": "Discovery new animes",
		"rec.crunchyroll.feature4": "Share curated collections",
		"rec.crunchyroll.connect":
			"Connect your Crunchyroll account to organize all your favorite anime content in one place.",
		"rec.crunchyroll.button": "Checkout Crunchyroll",
		"rec.support.title": "Support This Project",
		"rec.support.desc":
			"Help us keep the YouTube Group Manager alive and growing",
		"rec.support.text": "Your support helps us:",
		"rec.support.feature1": "Maintain server infrastructure",
		"rec.support.feature2":
			"Develop new features like the Crunchyroll integration",
		"rec.support.feature3": "Improve existing functionality",
		"rec.support.feature4": "Keep the service free for everyone",
		"rec.support.onetime": "One-time",
		"rec.support.monthly": "Monthly",
		"rec.support.cancel": "Cancel anytime",
		"rec.support.secure": "Secure one-time payment",
		"rec.support.donate": "Donate ${amount} {type}",
		"rec.support.footer":
			"100% of donations go toward development and server costs",

		// Shared Groups Overview
		"shared.overview.empty.title": "No shared groups yet",
		"shared.overview.empty.desc": "Groups shared with you will appear here",
		"shared.overview.owned": "Owned by {name}",
		"shared.overview.progress": "Channels Progress",
		"shared.overview.shared": "Shared",
		"shared.overview.activity": "Activity",
		"shared.overview.collaborators": "Collaborators",
		"shared.overview.views": "Views",

		// Top Channels
		"top.channels.title": "Top Performing Channels",
		"top.channels.desc":
			"Your channels with the most subscribers and engagement",
		"top.channels.search": "Search channels...",
		"top.channels.channel": "Channel",
		"top.channels.group": "Group",
		"top.channels.subscribers": "Subscribers",
		"top.channels.growth": "30-Day Growth",
		"top.channels.views": "Total Views",
		"top.channels.views30": "30-Day Views",
		"top.channels.videos": "{count} videos",
		"top.channels.empty": "No channels found.",

		// Upgrade Plan Modal
		"upgrade.title": "Upgrade Your Plan",
		"upgrade.desc.channels":
			"You've reached the maximum number of channels allowed on your current plan.",
		"upgrade.desc.groups":
			"You've reached the maximum number of groups allowed on your current plan.",
		"upgrade.body.channels":
			"To add more channels, please upgrade your plan to unlock more features.",
		"upgrade.body.groups":
			"To create more groups, please upgrade your plan to unlock more features.",
		"upgrade.cancel": "Cancel",
		"upgrade.button": "Upgrade Plan",

		// YouTube Connect Modal
		"youtube.connect.title": "Connect Your YouTube Account",
		"youtube.connect.desc":
			"You don't have any YouTube channels connected yet.",
		"youtube.connect.body":
			"To be able to organize your YouTube subscriptions and see their latest videos, please connect your Google account with YouTube subscriptions in your account settings.",
		"youtube.connect.later": "Maybe Later",
		"youtube.connect.settings": "Go to Account Settings",

		// Onboarding Tour
		"onboarding.back": "Back",
		"onboarding.skip": "Skip tour",
		"onboarding.next": "Next",
		"onboarding.finish": "Finish",
		"onboarding.step": "Step {current} of {total}",

		// Support
		"support.badge": "Help Center & Community",
		"support.title1": "How can we",
		"support.title2": "help you",
		"support.title3": "today?",
		"support.subtitle":
			"Whether you're troubleshooting an issue or want to help us shape the future of YouTube organization, we're just a click away.",
		"support.community.title": "Join the Community",
		"support.community.desc":
			"Get instant help from our team and fellow Groupify users. Share your setup, suggest new features, and stay updated.",
		"support.community.members": "1k+ Members",
		"support.community.beta": "Beta Access",
		"support.community.button": "Open Discord",
		"support.feature1.title": "Real-time Troubleshooting",
		"support.feature1.desc": "Direct access to our developers for quick fixes.",
		"support.feature2.title": "Priority Support",
		"support.feature2.desc": "Discord members get faster response times.",
		"support.feature3.title": "Feature Requests",
		"support.feature3.desc": "Vote on the next features we build.",
		"support.email.title": "Email Support",
		"support.email.desc":
			"Need a formal response? Send us an email and our support team will get back to you within 24 hours.",
		"support.email.address": "admin@nestfeed.app",
		"support.oss.title": "Open Source",
		"support.oss.desc":
			"Our core extension is open source. Browse the code, report technical bugs, or contribute on GitHub.",
		"support.oss.button": "View on GitHub",
		"support.footer": "(c) 2025 Groupify. All rights reserved.",

		// Share Page
		"share.loading.title": "Loading...",
		"share.loading.desc": "Fetching group information...",
		"share.error.expired": "Link Expired",
		"share.error.title": "Error",
		"share.error.expired.desc":
			"This share link has expired and is no longer valid.",
		"share.error.loading.desc": "Failed to load group data",
		"share.alert.expired":
			"Share links have a limited validity period. Please contact the person who shared this link to get a new one.",
		"share.button.dashboard": "Go to Dashboard",
		"share.card.collab": "Join Collaboration",
		"share.card.copy": "Copy Group",
		"share.card.collab.desc": 'You\'ve been invited to collaborate on "{name}"',
		"share.card.copy.desc": 'Copy all channels from "{name}" to your account',
		"share.group.unknown": "Unknown Group",
		"share.label.unknown": "Unknown",
		"share.desc.none": "No description available",
		"share.channels": "Channels",
		"share.permission.alert": "You will join as a {permission} permission.",
		"share.permission.view":
			" You will only be able to view channels and groups",
		"share.permission.edit":
			" You will be able to add, remove, and edit groups and channels.",
		"share.permission.admin":
			" You will have full control over group and can invite others.",
		"share.copy.alert": "This will copy all {count} channels to your account.",
		"share.cancel": "Cancel",
		"share.joining": "Joining...",
		"share.copying": "Copying...",
		"share.join": "Join Group",
		"share.copy.btn": "Copy Channels",

		// Subscription Confirm
		"subscription.confirming": "Confirming your email",
		"subscription.confirming.desc":
			"Please wait while we validate your confirmation link...",
		"subscription.failed": "Confirmation failed",
		"subscription.failed.desc":
			"We couldn't verify your email address. The link may have expired or is invalid.",
		"subscription.success": "Email confirmed!",
		"subscription.success.desc":
			"Your email has been successfully verified. You can now access all features of your account.",
		"subscription.dashboard": "Continue to Dashboard",
		"subscription.error.default": "Failed to confirm subscription",

		// Forgot Password Confirm
		"forgot.confirm.title": "Reset your password",
		"forgot.confirm.desc": "Enter your new password to reset it.",
		"forgot.confirm.newpassword": "New Password",
		"forgot.confirm.confirmpassword": "Confirm Password",
		"forgot.confirm.reset": "Reset password",
		"forgot.confirm.back": "Back to sign in",
		"forgot.confirm.error.match": "Passwords do not match",
		"forgot.confirm.success": "Password reset successfully",
		"forgot.confirm.error.default":
			"Failed to reset password. Please try again.",

		// Settings
		"settings.title": "Settings",
		"settings.desc": "Manage your preferences",
		"settings.tab.billing": "Billing",
		"settings.tab.account": "Account",
		"settings.tab.appearance": "Appearance",
		"settings.tab.groups": "Groups",

		// Account Settings
		"account.social": "Social Login",
		"account.google": "Google",
		"account.connected": "Connected",
		"account.notconnected": "Not connected",
		"account.disconnect": "Disconnect",
		"account.connect": "Connect",
		"account.discord": "Discord",
		"account.password.section": "Password",
		"account.newpassword": "New Password",
		"account.confirmpassword": "Confirm Password",
		"account.updatepassword": "Update Password",
		"account.tour": "Tour",
		"account.retour": "Redo Onboarding Tour",
		"account.retour.desc": "Start the guided tour again",
		"account.retour.button": "Redo Tour",
		"account.danger": "Danger Zone",
		"account.delete": "Delete Account",
		"account.delete.confirm": "Delete Account?",
		"account.delete.irreversible": "This cannot be undone.",
		"account.delete.body":
			"All your data including groups, analytics, and settings will be permanently deleted.",
		"account.delete.check1": "I understand all data will be lost",
		"account.delete.check2": "This action cannot be undone",
		"account.delete.type": "Type DELETE to confirm",
		"account.delete.cancel": "Cancel",
		"account.delete.confirm.btn": "Delete Account",

		// Billing Settings
		"billing.current": "Current Plan",
		"billing.ends": "Ends on: {date}",
		"billing.billed": "Billed monthly - Next: {date}",
		"billing.usage": "Usage",
		"billing.groups.label": "Groups",
		"billing.channels.label": "Channels",
		"billing.plans": "Available Plans",
		"billing.current.badge": "Current",
		"billing.free.name": "Free",
		"billing.basic.name": "Basic",
		"billing.pro.name": "Pro",
		"billing.month": "/mo",
		"billing.canceling": "Canceling...",
		"billing.cancel": "Cancel Subscription",
		"billing.change": "Change Plan",
		"billing.history": "Billing History",
		"billing.view": "View on Gumroad",
		"billing.cancel.title": "Cancel Subscription",
		"billing.cancel.desc":
			"Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.",
		"billing.keep": "Keep Subscription",
		"billing.cancel.confirm": "Cancel Subscription",

		// Group Settings
		"group.settings.saved": "Settings saved",
		"group.settings.config": "Configuration",
		"group.settings.maxchannels": "Max Channels per Group",
		"group.settings.duplicates": "Allow Duplicates",
		"group.settings.autosort": "Auto-Sort Channels",
		"group.settings.categories": "Categories",
		"group.settings.addcategory": "Add category",
		"group.settings.defaults": "Default Settings",
		"group.settings.defaultview": "Default View",
		"group.settings.grid": "Grid",
		"group.settings.list": "List",
		"group.settings.compact": "Compact",
		"group.settings.sortorder": "Sort Order",
		"group.settings.sort.subscribers": "Subscribers ↓",
		"group.settings.sort.name": "Name A-Z",
		"group.settings.saving": "Saving...",
		"group.settings.save": "Save Settings",

		// Appearance Settings
		"appearance.theme": "Theme",
		"appearance.light": "Light",
		"appearance.dark": "Dark",
		"appearance.nestfeed": "Groupify",

		// Dashboard Routes
		"dashboard.channels.title": "All Channels",
		"dashboard.channels.desc": "View and manage all YouTube channels",
		"dashboard.animes.title": "All Animes",
		"dashboard.animes.desc": "View and manage all animes",
		"dashboard.websites.title": "All Websites",
		"dashboard.websites.desc": "View and manage all websites",

		// Share Links Page
		"sharelinks.page.title": "Share Links",
		"sharelinks.page.desc": "Manage and monitor all your share links",
		"sharelinks.create": "Create New Link",
		"sharelinks.select.title": "Select a Group",
		"sharelinks.select.desc": "Choose a group to create a share link for.",
		"sharelinks.nogroups": "No groups found. Create a group first.",
		"sharelinks.channels": "{count} channels",
		"sharelinks.all": "All Share Links",

		// Group Detail Page
		"group.detail.breadcrumb": "Home",
		"group.detail.channels.count": "{count} channels",
		"group.detail.tab.channels": "Channels",
		"group.detail.tab.videos": "Videos",
		"group.detail.sync.error": "Failed to sync videos",
		"group.detail.settings.applied": "Settings Applied",
		"group.detail.settings.desc": "Your group settings have been applied.",

		// Group Edit/Create
		"group.edit.title": "Edit Group",
		"group.edit.desc": "Update your channel group details",
		"group.edit.submit": "Save Changes",
		"group.create.title": "Create Group",
		"group.create.desc": "Organize your YouTube channels into groups",
		"group.create.submit": "Create",
		"group.edit.error": "Error",
		"group.edit.error.desc": "Failed to update group. Please try again.",
		"group.create.error": "Error",
		"group.create.error.desc": "Failed to create group. Please try again.",

		// Blog Post
		"blog.post.back": "Back to Blog",
		"blog.post.written": "Written by {author}",
		"blog.post.author.desc":
			"Author of Groupify articles. Passionate about YouTube productivity and organization.",
	},
	pt: {
		collaborate_invite_title: "Convidar Colaboradores",
		collaborate_invite_desc:
			"Convide colaboradores para este grupo inserindo o endereço de e-mail e atribuindo uma função.",
		input_email_placeholder: "Digite o e-mail do colaborador",
		collaborators_label: "Colaboradores",
		collaborators_empty: "Nenhum colaborador ainda.",
		role_viewer: "Visualizador",
		role_editor: "Editor",
		role_admin: "Administrador",
		perm_view: "Pode visualizar o conteúdo do grupo",
		perm_edit: "Pode editar o conteúdo do grupo",
		perm_admin: "Acesso administrativo total",
		allow_comments_label: "Permitir comentários",
		share_link_desc:
			"Compartilhe este link com outras pessoas para permitir que visualizem ou copiem este grupo.",
		copied: "Copiado!",
		copy: "Copiar",
		generating: "Gerando...",
		generate_link: "Gerar Link de Cópia",
		add: "Adicionar",
		default_permission_title: "Permissão Padrão",
		share_link_title: "Link de Compartilhamento",
		join_as: "Qualquer pessoa com este link entrará permissão de {role}.",
		copy_link_title: "Link para Copiar Grupo",
		copy_link_desc:
			"Compartilhe este link com outras pessoas para permitir que copiem os canais deste grupo.",
		copy_destination_title: "Destino da Cópia",
		copy_destination_new: "Um novo grupo",
		copy_destination_existing: "Um grupo existente",
		copy_alert_desc: "Isso copiará {count} canais para o destino selecionado.",
		copy_alert_info:
			"Este link permite que outros copiem os canais para seus próprios grupos.",
		generate_copy_link: "Gerar Link para Copiar",
		group_details_title: "Detalhes do Grupo",
		channels: "Canais",
		share_settings_title: "Configurações de Compartilhamento",
		share_settings_collab:
			"Colaboradores terão acesso de {permission} a este grupo.",
		share_settings_copy:
			"Os destinatários poderão copiar todos os canais para {destination}.",
		destination_new: "um novo grupo",
		destination_existing: "um grupo existente",
		share_group_title: "Compartilhar Grupo",
		share_group_description: "Compartilhe seu grupo com outras pessoas",
		back_to_group: "Voltar para o Grupo",
		collaborate_tab_title: "Colaborar",
		copy_group_tab_title: "Copiar Grupo",
		// Navigation
		"nav.features": "Recursos",
		"nav.integrations": "Integrações",
		"nav.pricing": "Preços",
		"nav.reviews": "Avaliações",
		"nav.dashboard": "Painel",
		"nav.blog": "Blog",
		"nav.signin": "Entrar",
		"nav.getstarted": "Começar",

		// Footer / About / Contact / Consent
		"footer.tagline":
			"A melhor forma de organizar, gerenciar e compartilhar suas inscrições do YouTube.",
		"footer.resources": "Recursos",
		"footer.helpcenter": "Central de Ajuda",
		"footer.community": "Comunidade",
		"footer.contact": "Contato",
		"footer.about": "Sobre",
		"footer.privacy": "Política de Privacidade",
		"footer.terms": "Termos de Serviço",
		"about.badge": "Sobre nós",
		"about.title": "Sobre o Groupify",
		"about.subtitle":
			"Ajudamos amantes do YouTube a domar suas inscrições: organize canais em grupos, curadorie o que assistir e compartilhe tudo com amigos.",
		"about.mission.title": "Nossa missão",
		"about.mission.text":
			"O YouTube é a maior biblioteca de vídeos do mundo, mas gerenciar centenas de canais é um caos. O Groupify dá um lar para cada canal: crie grupos para animes, notícias, fitness, culinária ou qualquer outra coisa, mantenha tudo organizado e compartilhe um único link em vez de um mar de recomendações.",
		"about.story.title": "Por que criamos",
		"about.story.text":
			"O Groupify nasceu de uma necessidade pessoal: muitas inscrições, muitas pilhas de “assistir depois” e nenhuma boa forma de entregar uma seleção de canais a um amigo. Hoje é um painel completo onde você conecta sua conta, agrupa seus canais, sincroniza os últimos vídeos e compartilha links públicos com qualquer pessoa.",
		"about.values.title": "O que valorizamos",
		"about.value1.title": "Organização em primeiro lugar",
		"about.value1.desc":
			"Grupos são o núcleo do produto. Simples de criar, fáceis de reordenar e sempre em sincronia com sua lista de canais.",
		"about.value2.title": "Compartilhamento integrado",
		"about.value2.desc":
			"Todo grupo pode virar um link público de compartilhamento, para que sua curadoria chegue aos amigos sem fricção.",
		"about.value3.title": "Privacidade respeitada",
		"about.value3.desc":
			"Escolhas de cookies claras, anúncios não personalizados por padrão até você autorizar, e formas fáceis de falar conosco sobre seus dados.",
		"about.cta.title": "Pronto para organizar seus canais?",
		"about.cta.text":
			"Crie sua conta gratuita e monte seu primeiro grupo em minutos — ou leia o blog com dicas para cuidar da sua vida no YouTube.",
		"contact.badge": "Contato",
		"contact.title": "Fale com a gente",
		"contact.subtitle":
			"Dúvidas, feedback ou parcerias? Normalmente respondemos em até um dia útil.",
		"contact.email.title": "E-mail",
		"contact.email.desc":
			"Escreva diretamente à nossa equipe para suporte, cobrança ou pedidos de privacidade.",
		"contact.email.button": "Enviar e-mail",
		"contact.community.title": "Comunidade no Discord",
		"contact.community.desc":
			"Converse com outros usuários, reporte bugs e acompanhe novidades em tempo real.",
		"contact.community.button": "Entrar no Discord",
		"contact.help.title": "Central de ajuda",
		"contact.help.desc":
			"Veja guias e respostas para as dúvidas mais comuns sobre o Groupify.",
		"contact.help.button": "Abrir central de ajuda",
		"contact.response":
			"Para solicitações específicas de privacidade (acesso, correção ou exclusão de dados), envie um e-mail e responderemos em até 30 dias, conforme a lei aplicável.",
		"consent.title": "Cookies & anúncios",
		"consent.text":
			"Usamos cookies essenciais e de análise. Com seu consentimento também exibimos anúncios personalizados via Google AdSense; sem ele, os anúncios permanecem não personalizados.",
		"consent.accept": "Aceitar todos",
		"consent.reject": "Apenas não personalizados",
		"consent.learnMore": "Política de privacidade",

		// Login Page
		"login.welcome": "Bem-vindo de volta! Faça login em sua conta.",
		"login.title": "Entrar",
		"login.subtitle": "Digite seu email e senha para acessar seu painel",
		"login.description": "Digite seu email e senha para acessar seu painel",
		"login.email": "Email",
		"login.email.placeholder": "Digite seu email",
		"login.password": "Senha",
		"login.password.placeholder": "Digite sua senha",
		"login.forgot": "Esqueceu sua senha?",
		"login.signin": "Entrar",
		"login.signing": "Entrando...",
		"login.or": "Ou continue com",
		"login.google": "Entre com o Google",
		"login.discord": "Sign In with Discord",
		"login.github": "GitHub",
		"login.noaccount": "Não tem uma conta?",
		"login.signup": "Cadastre-se",
		"login.backhome": "Voltar ao início",
		"login.demo": "Credenciais de demonstração:",
		"login.demo.email": "Email: demo@example.com",
		"login.demo.password": "Senha: password",
		"login.validation.email.required": "Email é obrigatório",
		"login.validation.email.invalid":
			"Por favor, digite um endereço de email válido",
		"login.validation.password.required": "Senha é obrigatória",
		"login.validation.password.min": "A senha deve ter pelo menos 6 caracteres",

		// Forgot Password Page
		"forgot.title": "Redefinir Senha",
		"forgot.description":
			"Digite seu endereço de email e enviaremos um link para redefinir sua senha.",
		"forgot.email": "Email",
		"forgot.email.placeholder": "Digite seu endereço de email",
		"forgot.send": "Enviar Link de Redefinição",
		"forgot.sending": "Enviando...",
		"forgot.error": "Falha ao enviar email de redefinição. Tente novamente.",
		"forgot.backsignin": "Voltar ao Login",
		"forgot.success.title": "Verifique Seu Email",
		"forgot.success.description":
			"Enviamos um link de redefinição de senha para",
		"forgot.success.next.title": "O que fazer agora?",
		"forgot.success.next.step1": "1. Verifique sua caixa de entrada",
		"forgot.success.next.step2": "2. Clique no link de redefinição no email",
		"forgot.success.next.step3": "3. Crie uma nova senha",
		"forgot.success.noemail.title": "Não recebeu o email?",
		"forgot.success.noemail.description":
			"Verifique sua pasta de spam ou tente reenviar o email.",
		"forgot.success.resend": "Reenviar Email",
		"forgot.success.backsignin": "Voltar ao Login",

		// Hero Section
		"hero.badge": "Novo: Integração Crunchyroll",
		"hero.title": "Organize Seus Canais do YouTube Como um Profissional",
		"hero.subtitle":
			"Organize seus canais do YouTube com grupos personalizados, colabore com sua equipe e acesse análises avançadas — tudo em um painel intuitivo.",
		"hero.starttrial": "Iniciar Teste Grátis",
		"hero.watchdemo": "Ver Demo",
		"hero.freetrial": "Teste grátis de 14 dias",
		"hero.nocreditcard": "Não precisa de cartão de crédito",
		"hero.cancelanytime": "Cancele a qualquer momento",
		// Register Page
		"register.welcome":
			"Crie sua conta e comece a organizar seus canais do YouTube.",
		"register.title": "Criar Conta",
		"register.description": "Digite seus dados para criar sua conta",
		"register.name": "Nome Completo",
		"register.name.placeholder": "Digite seu nome completo",
		"register.email": "Email",
		"register.email.placeholder": "Digite seu email",
		"register.password": "Senha",
		"register.password.placeholder": "Crie uma senha",
		"register.confirmpassword": "Confirmar Senha",
		"register.confirmpassword.placeholder": "Confirme sua senha",
		"register.terms": "Eu concordo com os",
		"register.terms.link": "Termos de Serviço",
		"register.privacy": "e",
		"register.privacy.link": "Política de Privacidade",
		"register.signup": "Criar Conta",
		"register.signing": "Criando conta...",
		"register.or": "Ou continue com",
		"register.google": "Google",
		"register.discord": "Discord",
		"register.hasaccount": "Já tem uma conta?",
		"register.signin": "Entrar",
		"register.backhome": "Voltar ao início",
		"register.validation.name.required": "Nome completo é obrigatório",
		"register.validation.name.min": "Nome deve ter pelo menos 2 caracteres",
		"register.validation.email.required": "Email é obrigatório",
		"register.validation.email.invalid":
			"Por favor, digite um endereço de email válido",
		"register.validation.password.required": "Senha é obrigatória",
		"register.validation.password.min":
			"A senha deve ter pelo menos 6 caracteres",
		"register.validation.confirmpassword.required":
			"Por favor, confirme sua senha",
		"register.validation.confirmpassword.match": "As senhas não coincidem",

		// Stats
		"stats.activeusers": "Usuários Ativos",
		"stats.channelsmanaged": "Canais Gerenciados",
		"stats.groupscreated": "Grupos Criados",
		"stats.uptime": "Tempo Ativo",

		// Features
		"features.badge": "Recursos",
		"features.title": "Tudo Que Você Precisa",
		"features.subtitle":
			"Recursos poderosos projetados para ajudá-lo a gerenciar, organizar e expandir seu portfólio de canais do YouTube.",
		"features.smartorg.title": "Organização Inteligente de Grupos",
		"features.smartorg.desc":
			"Crie grupos hierárquicos com ícones personalizados e organize seus canais do YouTube de forma eficiente.",
		"features.collaboration.title": "Colaboração e Compartilhamento",
		"features.collaboration.desc":
			"Compartilhe grupos com membros da equipe, establece permisos e colabore no gerenciamento de canais.",
		"features.analytics.title": "Análises Avançadas",
		"features.analytics.desc":
			"Acompanhe o crescimento de inscritos, visualize estatísticas e analise o desempenho dos canais com gráficos detalhados.",
		"features.youtube.title": "Integração com API do YouTube",
		"features.youtube.desc":
			"Sincronize automaticamente dados de canais, contagem de inscritos e estatísticas de vídeos em tempo real.",
		"features.team.title": "Gerenciamento de Equipe",
		"features.team.desc":
			"Convide colaboradores com diferentes níveis de permisos e gerencie o acesso aos seus grupos.",
		"features.responsive.title": "Design Responsivo",
		"features.responsive.desc":
			"Acesse seu painel de qualquer dispositivo com nossa interface totalmente responsiva e otimizada para mobile.",

		// Integrations
		"integrations.badge": "Integrações",
		"integrations.title": "Integrações Poderosas",
		"integrations.subtitle":
			"Conecte-se com suas plataformas e ferramentas favoritas para turbinar seu fluxo de trabalho.",
		"integrations.crunchyroll.desc":
			"Acompanhe conteúdo de anime em plataformas",
		"integrations.youtube.desc":
			"Sincronização de dados de canal em tempo real",
		"integrations.export.desc": "Um lugar para encontrar grupos da comunidade",

		// Landing Page - New Content
		"landing.hero.badge": "Agora com Extensão de Navegador",
		"landing.hero.title": "Organize Seu YouTube Como Nunca Antes",
		"landing.hero.subtitle":
			"O Groupify ajuda você a organizar, gerenciar e compartilhar suas inscrições do YouTube. Crie grupos personalizados, colabore com equipes e nunca perca o controle de seus canais favoritos novamente.",
		"landing.hero.cta.primary": "Iniciar Teste Grátis",
		"landing.hero.cta.secondary": "Ver Demo",
		"landing.hero.trust1": "Não requer cartão de crédito",
		"landing.hero.trust2": "Teste grátis de 14 dias",
		"landing.hero.trust3": "Cancele a qualquer momento",
		"landing.hero.preview": "Painel do Groupify",

		// Landing Page - Features Section
		"landing.features.title": "Tudo Que Você Precisa para Organizar o YouTube",
		"landing.features.subtitle":
			"Recursos poderosos projetados para criadores de conteúdo, equipes e entusiastas do YouTube",
		"landing.features.smart.title": "Organização Inteligente",
		"landing.features.smart.desc":
			"Crie grupos ilimitados com categorias personalizadas. Aninhe grupos dentro de grupos para máxima flexibilidade na gestão de suas inscrições do YouTube.",
		"landing.features.share.title": "Compartilhar e Colaborar",
		"landing.features.share.desc":
			"Gere links compartilháveis para permitir que outros visualizem ou copiem seus grupos. Perfeito para criadores de conteúdo, equipes e comunidades.",
		"landing.features.permissions.title": "Permissões de Equipe",
		"landing.features.permissions.desc":
			"Controle o acesso com permissões granulares. Atribua funções de somente visualização, editor ou administrador para gerenciar quem pode modificar seus grupos.",
		"landing.features.bulk.title": "Operações em Massa",
		"landing.features.bulk.desc":
			"Economize tempo com ações em lote poderosas. Adicione, remova ou mova vários canais entre grupos em segundos.",
		"landing.features.extension.title": "Integração com Extensão",
		"landing.features.extension.desc":
			"Nossa extensão de navegador permite adicionar canais diretamente do YouTube. Organização com um clique enquanto você navega.",
		"landing.features.everywhere.title": "Funciona em Qualquer Lugar",
		"landing.features.everywhere.desc":
			"Acesse seus canais organizados de qualquer dispositivo. Aplicativo web e extensões de navegador para Chrome, Firefox e Safari.",

		// Landing Page - Browser Extension Section
		"landing.extension.badge": "Extensão de Navegador",
		"landing.extension.title": "Adicione Canais Enquanto Navega",
		"landing.extension.subtitle":
			"Nossa extensão de navegador se integra perfeitamente com o YouTube. Quando encontrar um canal que deseja salvar, basta clicar no ícone do Groupify e adicioná-lo a qualquer grupo instantaneamente.",
		"landing.extension.success": "Canal adicionado ao grupo",
		"landing.extension.subscribers": "inscritos",

		// Landing Page - Testimonials Section
		"landing.testimonials.title": "Adorado por Criadores de Conteúdo",
		"landing.testimonials.subtitle":
			"Veja o que nossos usuários estão dizendo sobre o Groupify",
		"landing.testimonials.alex.content":
			"O Groupify transformou completamente como eu gerencio minhas inscrições do YouTube. Finalmente posso manter meu conteúdo educacional separado do entretenimento!",
		"landing.testimonials.sarah.content":
			"A capacidade de compartilhar grupos curados com minha equipe foi uma revolução. Podemos compartilhar rapidamente insights do setor e análises de concorrentes.",
		"landing.testimonials.mike.content":
			"Já experimentei muitas ferramentas, mas o Groupify é a única que realmente entende como os criadores de conteúdo trabalham. O recurso de grupos aninhados é brilhante!",

		// Landing Page - Pricing Section
		"landing.pricing.title": "Preços Simples e Transparentes",
		"landing.pricing.subtitle":
			"Escolha o plano que se adapta às suas necessidades. Todos os planos incluem um teste grátis de 14 dias.",
		"landing.pricing.free.name": "Grátis",
		"landing.pricing.free.desc": "Perfeito para começar",
		"landing.pricing.pro.name": "Pro",
		"landing.pricing.pro.desc": "Melhor para criadores de conteúdo",
		"landing.pricing.business.name": "Business",
		"landing.pricing.business.desc": "Para equipes e agências",
		"landing.pricing.cta.free": "Começar Grátis",
		"landing.pricing.cta.pro": "Iniciar Teste Pro",
		"landing.pricing.cta.business": "Obter Business",
		"landing.pricing.mostpopular": "MAIS POPULAR",

		// Landing Page - CTA Section
		"landing.cta.title": "Pronto para Organizar Seu YouTube?",
		"landing.cta.subtitle":
			"Junte-se a milhares de criadores de conteúdo e equipes que confiam no Groupify para gerenciar suas inscrições do YouTube.",
		"landing.cta.primary": "Começar Grátis",
		"landing.cta.secondary": "Juntar-se à Comunidade",

		// Testimonials
		"testimonials.badge": "Depoimentos",
		"testimonials.title": "Amado por Criadores",
		"testimonials.subtitle":
			"Veja o que criadores de conteúdo e agências estão dizendo sobre o Groupify.",
		"testimonials.alex.content":
			"Esta ferramenta revolucionou como gestiono mis más de 50 canales de YouTube. ¡La función de agrupación es revolucionária!",
		"testimonials.sarah.content":
			"Perfecto para nuestra agencia. Ahora podemos organizar canales de clientes de forma eficiente y compartir acceso con miembros del equipo.",
		"testimonials.mike.content":
			"El panel de análisis me dá insights que nunca tuve antes. Altamente recomendado para creadores serios.",

		// Pricing
		"pricing.badge": "Preços",
		"pricing.title": "Preços Simples e Transparentes",
		"pricing.subtitle":
			"Escolha o plano certo para você. Faça upgrade ou downgrade a qualquer momento.",
		"pricing.popular": "Mais Popular",
		"pricing.free.name": "Grátis",
		"pricing.free.desc": "Perfeito para começar",
		"pricing.pro.name": "Pro",
		"pricing.pro.desc": "Para criadores de conteúdo sérios",
		"pricing.business.name": "Empresarial",
		"pricing.business.desc": "Para agências e equipes",
		"pricing.getstarted": "Começar",
		"pricing.starttrial": "Iniciar Teste Grátis",
		"pricing.contactsales": "Contatar Vendas",

		// CTA
		"cta.badge": "Pronto para Lanzar",
		"cta.title": "¿Listo para Comenzar?",
		"cta.subtitle":
			"Únete a miles de creadores de contenido que já estão usando o Groupify para organizar e expandir sua presença no YouTube.",

		// Footer
		"footer.description":
			"La herramienta definitiva para organizar y gestionar tu portafolio de canales de YouTube con diseño moderno y características poderosas.",
		"footer.product": "Produto",
		"footer.company": "Empresa",
		"footer.support": "Soporte",
		"footer.copyright":
			"Todos los derechos reservados. Hecho con ❤️ para creadores de contenido.",

		// Dashboard
		"dashboard.greeting.morning": "Bom dia",
		"dashboard.greeting.afternoon": "Boa tarde",
		"dashboard.greeting.evening": "Boa noite",
		"dashboard.greeting.subtitle":
			"Veja o que está acontecendo com seus grupos hoje",
		"dashboard.quickactions": "Ações Rápidas",
		"dashboard.create.group": "Criar Grupo",
		"dashboard.create.group.desc": "Organizar canais",
		"dashboard.view.channels": "Ver Canais",
		"dashboard.view.channels.desc": "Gerenciar tudo",
		"dashboard.share.links": "Links de Compartilhamento",
		"dashboard.share.links.desc": "Gerenciar acesso",
		"dashboard.upgrade.plan": "Atualizar Plano",
		"dashboard.upgrade.plan.desc": "Mais recursos",
		"dashboard.overview": "Visão Geral",
		"dashboard.yourgroups": "Seus Grupos",
		"dashboard.tab.groups": "Grupos",
		"dashboard.tab.shared": "Compartilhados",
		"dashboard.recent.title": "Grupos Recentes",
		"dashboard.recent.features": "Recursos Recentes",
		"dashboard.recent.all": "Todos",
		"dashboard.shared.title": "Grupos Compartilhados",
		"dashboard.shared.access": "Acesso Compartilhado",
		"dashboard.shared.subtitle": "Grupos compartilhados com você",

		// Groups
		"groups.title": "Grupos",
		"groups.description": "Gerenciar seus grupos de canais do YouTube",
		"groups.new": "Novo Grupo",
		"groups.loading": "Carregando grupos...",
		"groups.error.title": "Erro ao Carregar Grupos",
		"groups.error.description": "Falha ao carregar grupos. Tente novamente.",

		// Group Form
		"group.form.name": "Nome",
		"group.form.name.placeholder": "Meu Grupo",
		"group.form.description": "Descrição",
		"group.form.description.placeholder": "Sobre o que é este grupo?",
		"group.form.category": "Categoria",
		"group.form.icon": "Ícone",
		"group.form.parent": "Grupo Pai (Opcional)",
		"group.form.parent.none": "Nenhum (nível superior)",
		"group.form.parent.hint": "Crie subgrupos para organizar hierarquicamente",
		"group.form.cancel": "Cancelar",
		"group.form.creating": "Criando...",
		"group.form.submit": "Enviar",
		"group.form.shelf": "Ativar Prateleira de Grupos",
		"group.form.validation.required": "Obrigatório",
		"group.form.validation.max50": "Máx 50 caracteres",
		"group.form.validation.pattern":
			"Apenas letras, números, espaços, hífens e underscores",
		"group.form.category.placeholder": "Selecione uma categoria",
		"group.form.icon.placeholder": "Selecione um ícone",

		// Blog
		"blog.title": "Últimas Atualizações",
		"blog.brand": "Blog do Groupify",
		"blog.search": "Pesquisar...",
		"blog.featured": "Em Destaque",
		"blog.trending": "Trending",
		"blog.read": "Ler Artigo",
		"blog.author.team": "Equipe Groupify",
		"blog.results": "Resultados",
		"blog.allposts": "Todos os Posts",
		"blog.none.title": "Nenhum post encontrado",
		"blog.none.description": "Nenhum post nesta categoria.",
		"blog.prev": "Anterior",
		"blog.next": "Próximo",
		"blog.category.all": "Todos",
		"blog.category.product": "Produto",
		"blog.category.engineering": "Engenharia",
		"blog.category.design": "Design",
		"blog.category.community": "Comunidade",
		"blog.category.tutorials": "Tutoriais",

		// Not Found
		"notfound.description": "A página que você procura não existe.",
		"notfound.goback": "Voltar",
		"notfound.startover": "Recomeçar",

		// Sidebar
		"sidebar.dashboard": "Painel",
		"sidebar.groups": "Grupos",
		"sidebar.channels": "Canais",
		"sidebar.animes": "Animes",
		"sidebar.websites": "Sites",
		"sidebar.settings": "Configurações",

		// Social Login Labels
		"login.welcome.badge": "Bem-vindo de volta",
		"register.welcome.badge": "Junte-se ao Groupify",
		"login.social.google": "Google",
		"login.social.discord": "Discord",

		// Channels
		"channels.add.search": "Pesquisar",
		"channels.add.fetching": "Buscando...",
		"channels.add.fetch": "Buscar",
		"channels.add.added": "Adicionado",
		"channels.add.add": "Adicionar",
		"groupshelf.title": "Prateleira de Grupos",

		// Videos
		"videos.all.channels": "Todos os canais",

		// Share Links
		"sharelinks.noexpiration": "Sem expiração",
		"sharelinks.unknown": "Desconhecido",

		// Groups Table
		"groups.table.search": "Pesquisar grupos...",
		"groups.table.name": "Nome",
		"groups.table.category": "Categoria",
		"groups.table.channels": "Canais",
		"groups.table.created": "Criado",
		"groups.table.actions": "Ações",
		"groups.table.loading": "Carregando grupos...",
		"groups.table.noresults": 'Nenhum grupo corresponde a "{search}"',
		"groups.table.noresults.hint": "Tente ajustar seus termos de pesquisa",
		"groups.table.empty": "Nenhum grupo encontrado",
		"groups.table.subgroup": "(subgrupo)",
		"groups.table.addsubgroup.sr": "Adicionar subgrupo",
		"groups.table.openmenu": "Abrir menu",
		"groups.table.viewdetails": "Ver detalhes",
		"groups.table.edit": "Editar",
		"groups.table.addsubgroup.menu": "Adicionar Subgrupo",
		"groups.table.moveup": "Mover para Cima",
		"groups.table.movedown": "Mover para Baixo",
		"groups.table.delete": "Excluir",
		"groups.table.itemsperpage": "Itens por página:",
		"groups.table.updated": "Ordem dos grupos atualizada",
		"groups.table.updated.desc": "A ordem dos grupos foi salva",
		"groups.table.update.error": "Falha ao atualizar ordem dos grupos",
		"groups.table.update.error.desc": "Tente novamente mais tarde",
		"groups.table.delete.confirm":
			'Tem certeza que deseja excluir "{name}"? Esta ação não pode ser desfeita.',
		"groups.table.deleted": "Grupo excluído com sucesso",
		"groups.table.deleted.desc": '"{name}" foi excluído.',
		"groups.table.delete.error": "Falha ao excluir grupo",
		"groups.table.delete.error.desc": "Tente novamente mais tarde.",
		"groups.table.moved": "Grupo movido",
		"groups.table.moved.desc": "{name} movido {direction}",
		"groups.table.move.error": "Falha ao mover grupo",
		"groups.table.move.error.desc": "Tente novamente mais tarde",

		// Channels Table
		"channels.table.search": "Pesquisar canais...",
		"channels.table.channel": "Canal",
		"channels.table.actions": "Ações",
		"channels.table.empty": "Nenhum canal encontrado.",
		"channels.table.visit": "Visitar canal",
		"channels.table.remove": "Remover do grupo",
		"channels.table.visit.short": "Visitar",
		"channels.table.remove.short": "Remover",
		"channels.table.sort.recent": "Adicionados Recentemente",
		"channels.table.sort.nameaz": "Nome (A a Z)",
		"channels.table.sort.nameza": "Nome (Z a A)",
		"channels.table.view.grid": "Visualização em grade",
		"channels.table.view.list": "Visualização em lista",
		"channels.table.view.compact": "Visualização compacta",
		"channels.table.openmenu": "Abrir menu",

		// All Channels
		"all.channels.search": "Pesquisar canais ou grupos...",
		"all.channels.error": "Erro ao carregar canais: {message}",
		"all.channels.channel": "Canal",
		"all.channels.group": "Grupo",
		"all.channels.actions": "Ações",
		"all.channels.loading": "Carregando canais...",
		"all.channels.empty": "Nenhum canal encontrado.",
		"all.channels.assign": "Atribuir Grupo",
		"all.channels.visit": "Visitar canal",
		"all.channels.changegroup": "Alterar grupo",
		"all.channels.delete": "Excluir canal",
		"all.channels.itemsperpage": "Itens por página",
		"all.channels.itemsPerPagePlaceholder": "Itens por página",
		"all.channels.openmenu": "Abrir menu",
		"all.channels.notfound": "Nenhum canal encontrado",
		"all.channels.sync":
			"Sincronize sua conta do Google para importar seus canais do YouTube.",
		"all.channels.sync.link": "Ir para configurações",
		"all.channels.syncDescription": "Sincronize sua conta do Google para",

		// All Animes
		"all.animes.search": "Pesquisar animes...",
		"all.animes.error": "Erro ao carregar canais: {message}",
		"all.animes.channel": "Canal",
		"all.animes.group": "Grupo",
		"all.animes.actions": "Ações",
		"all.animes.loading": "Carregando canais...",
		"all.animes.empty": "Nenhum anime encontrado.",
		"all.animes.assign": "Atribuir Grupo",
		"all.animes.visit": "Visitar anime",
		"all.animes.changegroup": "Alterar grupo",
		"all.animes.delete": "Excluir canal",
		"all.animes.itemsperpage": "Itens por página",
		"all.animes.itemsPerPagePlaceholder": "Itens por página",
		"all.animes.openmenu": "Abrir menu",

		// All Websites
		"all.websites.search": "Pesquisar sites...",
		"all.websites.error": "Erro ao carregar sites.",
		"all.websites.website": "Site",
		"all.websites.url": "URL",
		"all.websites.group": "Grupo",
		"all.websites.actions": "Ações",
		"all.websites.loading": "Carregando...",
		"all.websites.empty": "Nenhum site encontrado.",
		"all.websites.visit": "Visitar site",
		"all.websites.delete": "Excluir",
		"all.websites.openmenu": "Abrir menu",

		// Group Details
		"group.details.shelf": "Prateleira do Grupo",
		"group.details.edit": "Editar Grupo",
		"group.details.share": "Compartilhar",
		"group.details.addchannel": "Adicionar Canal",
		"group.details.created": "Criado",
		"group.details.channels": "Canais",

		// Group List
		"group.list.empty.title": "Nenhum grupo ainda",
		"group.list.empty.desc":
			"Comece a organizar seus canais do YouTube em grupos",
		"group.list.create": "Criar Seu Primeiro Grupo",
		"group.list.channels": "{count} canais",

		// Dashboard Stats
		"stats.total.groups": "Total de Grupos",
		"stats.total.channels.groups": "Total de Canais em Grupos",
		"stats.shared.groups": "Grupos Compartilhados",
		"stats.total.youtube": "Total de Canais do YouTube",
		"stats.total.anime": "Total de Canais de Anime",

		// Recent Activity
		"recent.feature.organize.title": "Organizar com Grupos",
		"recent.feature.organize.desc":
			"Crie grupos ilimitados para organizar seus canais do YouTube por tópico, projeto ou qualquer critério necessário.",
		"recent.feature.organize.badge": "Recurso Principal",
		"recent.feature.share.title": "Compartilhar e Colaborar",
		"recent.feature.share.desc":
			"Gere links de compartilhamento para que outros vejam ou copiem seus grupos. Perfeito para equipes e comunidades.",
		"recent.feature.share.badge": "Popular",
		"recent.feature.permissions.title": "Permissões de Equipe",
		"recent.feature.permissions.desc":
			"Controle o acesso com permissões de visualização, edição ou administração. Gerencie quem pode modificar seus grupos.",
		"recent.feature.permissions.badge": "Pro",
		"recent.feature.bulk.title": "Operações em Massa",
		"recent.feature.bulk.desc":
			"Adicione, remova ou mova vários canais de uma vez. Economize tempo com ações em lote poderosas.",
		"recent.feature.extension.title": "Integração com Extensão",
		"recent.feature.extension.desc":
			"Use nossa extensão de navegador para adicionar canais rapidamente enquanto navega no YouTube diretamente.",
		"recent.feature.extension.badge": "Novo",
		"recent.tip.title": "Dica Profissional",
		"recent.tip.desc":
			"Use subgrupos para criar hierarquias aninhadas. Perfeito para organizar grandes coleções por subtópico ou fase do projeto.",

		// Recommendation Cards
		"rec.crunchyroll.badge": "Nova Integração",
		"rec.crunchyroll.anime": "Anime",
		"rec.crunchyroll.title": "Integração Crunchyroll",
		"rec.crunchyroll.desc":
			"Combine perfeitamente conteúdo de anime do YouTube e Crunchyroll",
		"rec.crunchyroll.overlay":
			"A experiência definitiva de rastreamento de animes",
		"rec.crunchyroll.unlock": "Desbloqueie a experiência completa de anime",
		"rec.crunchyroll.feature1": "Acompanhe animes em ambas as plataformas",
		"rec.crunchyroll.feature2": "Controle todas as suas coleções",
		"rec.crunchyroll.feature3": "Descubra novos animes",
		"rec.crunchyroll.feature4": "Compartilhe coleções selecionadas",
		"rec.crunchyroll.connect":
			"Conecte sua conta Crunchyroll para organizar todo o seu conteúdo de anime favorito em um só lugar.",
		"rec.crunchyroll.button": "Conhecer Crunchyroll",
		"rec.support.title": "Apoie Este Projeto",
		"rec.support.desc":
			"Ajude-nos a manter o YouTube Group Manager vivo e crescendo",
		"rec.support.text": "Seu apoio nos ajuda a:",
		"rec.support.feature1": "Manter a infraestrutura do servidor",
		"rec.support.feature2":
			"Desenvolver novos recursos como a integração Crunchyroll",
		"rec.support.feature3": "Melhorar a funcionalidade existente",
		"rec.support.feature4": "Manter o serviço gratuito para todos",
		"rec.support.onetime": "Único",
		"rec.support.monthly": "Mensal",
		"rec.support.cancel": "Cancelar a qualquer momento",
		"rec.support.secure": "Pagamento único seguro",
		"rec.support.donate": "Doar ${amount} {type}",
		"rec.support.footer":
			"100% das doações vão para desenvolvimento e custos de servidor",

		// Shared Groups Overview
		"shared.overview.empty.title": "Nenhum grupo compartilhado ainda",
		"shared.overview.empty.desc":
			"Grupos compartilhados com você aparecerão aqui",
		"shared.overview.owned": "Propriedade de {name}",
		"shared.overview.progress": "Progresso dos Canais",
		"shared.overview.shared": "Compartilhado",
		"shared.overview.activity": "Atividade",
		"shared.overview.collaborators": "Colaboradores",
		"shared.overview.views": "Visualizações",

		// Top Channels
		"top.channels.title": "Canais de Melhor Desempenho",
		"top.channels.desc": "Seus canais com mais inscritos e engajamento",
		"top.channels.search": "Pesquisar canais...",
		"top.channels.channel": "Canal",
		"top.channels.group": "Grupo",
		"top.channels.subscribers": "Inscritos",
		"top.channels.growth": "Crescimento em 30 Dias",
		"top.channels.views": "Total de Visualizações",
		"top.channels.views30": "Visualizações em 30 Dias",
		"top.channels.videos": "{count} vídeos",
		"top.channels.empty": "Nenhum canal encontrado.",

		// Upgrade Plan Modal
		"upgrade.title": "Atualizar Seu Plano",
		"upgrade.desc.channels":
			"Você atingiu o número máximo de canais permitido no seu plano atual.",
		"upgrade.desc.groups":
			"Você atingiu o número máximo de grupos permitido no seu plano atual.",
		"upgrade.body.channels":
			"Para adicionar mais canais, atualize seu plano para desbloquear mais recursos.",
		"upgrade.body.groups":
			"Para criar mais grupos, atualize seu plano para desbloquear mais recursos.",
		"upgrade.cancel": "Cancelar",
		"upgrade.button": "Atualizar Plano",

		// YouTube Connect Modal
		"youtube.connect.title": "Conectar Sua Conta do YouTube",
		"youtube.connect.desc":
			"Você ainda não tem nenhum canal do YouTube conectado.",
		"youtube.connect.body":
			"Para organizar suas inscrições do YouTube e ver seus vídeos mais recentes, conecte sua conta do Google com inscrições do YouTube nas configurações da sua conta.",
		"youtube.connect.later": "Talvez Depois",
		"youtube.connect.settings": "Ir para Configurações da Conta",

		// Onboarding Tour
		"onboarding.back": "Voltar",
		"onboarding.skip": "Pular tour",
		"onboarding.next": "Próximo",
		"onboarding.finish": "Concluir",
		"onboarding.step": "Passo {current} de {total}",

		// Support
		"support.badge": "Central de Ajuda & Comunidade",
		"support.title1": "Como podemos",
		"support.title2": "ajudar",
		"support.title3": "você hoje?",
		"support.subtitle":
			"Seja resolvendo um problema ou querendo ajudar a moldar o futuro da organização do YouTube, estamos a um clique de distância.",
		"support.community.title": "Junte-se à Comunidade",
		"support.community.desc":
			"Obtenha ajuda instantânea de nossa equipe e outros usuários do Groupify. Compartilhe sua configuração, sugira novos recursos e fique atualizado.",
		"support.community.members": "Mais de 1k Membros",
		"support.community.beta": "Acesso Beta",
		"support.community.button": "Abrir Discord",
		"support.feature1.title": "Solução de Problemas em Tempo Real",
		"support.feature1.desc":
			"Acesso direto aos nossos desenvolvedores para correções rápidas.",
		"support.feature2.title": "Suporte Prioritário",
		"support.feature2.desc":
			"Membros do Discord recebem tempos de resposta mais rápidos.",
		"support.feature3.title": "Solicitações de Recursos",
		"support.feature3.desc":
			"Vote nos próximos recursos que vamos desenvolver.",
		"support.email.title": "Suporte por Email",
		"support.email.desc":
			"Precisa de uma resposta formal? Envie-nos um email e nossa equipe de suporte responderá em até 24 horas.",
		"support.email.address": "admin@nestfeed.app",
		"support.oss.title": "Código Aberto",
		"support.oss.desc":
			"Nossa extensão principal é de código aberto. Navegue pelo código, reporte bugs técnicos ou contribua no GitHub.",
		"support.oss.button": "Ver no GitHub",
		"support.footer": "(c) 2025 Groupify. Todos os direitos reservados.",

		// Share Page
		"share.loading.title": "Carregando...",
		"share.loading.desc": "Buscando informações do grupo...",
		"share.error.expired": "Link Expirado",
		"share.error.title": "Erro",
		"share.error.expired.desc":
			"Este link de compartilhamento expirou e não é mais válido.",
		"share.error.loading.desc": "Falha ao carregar dados do grupo",
		"share.alert.expired":
			"Os links de compartilhamento têm um período de validade limitado. Entre em contato com a pessoa que compartilhou este link para obter um novo.",
		"share.button.dashboard": "Ir para o Painel",
		"share.card.collab": "Participar da Colaboração",
		"share.card.copy": "Copiar Grupo",
		"share.card.collab.desc": 'Você foi convidado a colaborar em "{name}"',
		"share.card.copy.desc": 'Copiar todos os canais de "{name}" para sua conta',
		"share.group.unknown": "Grupo Desconhecido",
		"share.label.unknown": "Desconhecido",
		"share.desc.none": "Nenhuma descrição disponível",
		"share.channels": "Canais",
		"share.permission.alert": "Você entrará como permissão de {permission}.",
		"share.permission.view": " Você poderá apenas visualizar canais e grupos",
		"share.permission.edit":
			" Você poderá adicionar, remover e editar grupos e canais.",
		"share.permission.admin":
			" Você terá controle total sobre o grupo e poderá convidar outros.",
		"share.copy.alert": "Isso copiará todos os {count} canais para sua conta.",
		"share.cancel": "Cancelar",
		"share.joining": "Entrando...",
		"share.copying": "Copiando...",
		"share.join": "Entrar no Grupo",
		"share.copy.btn": "Copiar Canais",

		// Subscription Confirm
		"subscription.confirming": "Confirmando seu email",
		"subscription.confirming.desc":
			"Aguarde enquanto validamos seu link de confirmação...",
		"subscription.failed": "Falha na confirmação",
		"subscription.failed.desc":
			"Não foi possível verificar seu endereço de email. O link pode ter expirado ou ser inválido.",
		"subscription.success": "Email confirmado!",
		"subscription.success.desc":
			"Seu email foi verificado com sucesso. Agora você pode acessar todos os recursos da sua conta.",
		"subscription.dashboard": "Ir para o Painel",
		"subscription.error.default": "Falha ao confirmar inscrição",

		// Forgot Password Confirm
		"forgot.confirm.title": "Redefinir sua senha",
		"forgot.confirm.desc": "Digite sua nova senha para redefini-la.",
		"forgot.confirm.newpassword": "Nova Senha",
		"forgot.confirm.confirmpassword": "Confirmar Senha",
		"forgot.confirm.reset": "Redefinir senha",
		"forgot.confirm.back": "Voltar ao login",
		"forgot.confirm.error.match": "As senhas não coincidem",
		"forgot.confirm.success": "Senha redefinida com sucesso",
		"forgot.confirm.error.default":
			"Falha ao redefinir senha. Tente novamente.",

		// Settings
		"settings.title": "Configurações",
		"settings.desc": "Gerenciar suas preferências",
		"settings.tab.billing": "Faturamento",
		"settings.tab.account": "Conta",
		"settings.tab.appearance": "Aparência",
		"settings.tab.groups": "Grupos",

		// Account Settings
		"account.social": "Login Social",
		"account.google": "Google",
		"account.connected": "Conectado",
		"account.notconnected": "Não conectado",
		"account.disconnect": "Desconectar",
		"account.connect": "Conectar",
		"account.discord": "Discord",
		"account.password.section": "Senha",
		"account.newpassword": "Nova Senha",
		"account.confirmpassword": "Confirmar Senha",
		"account.updatepassword": "Atualizar Senha",
		"account.tour": "Tour",
		"account.retour": "Refazer Tour de Onboarding",
		"account.retour.desc": "Iniciar o tour guiado novamente",
		"account.retour.button": "Refazer Tour",
		"account.danger": "Zona Perigosa",
		"account.delete": "Excluir Conta",
		"account.delete.confirm": "Excluir Conta?",
		"account.delete.irreversible": "Isso não pode ser desfeito.",
		"account.delete.body":
			"Todos os seus dados, incluindo grupos, análises e configurações, serão excluídos permanentemente.",
		"account.delete.check1": "Eu entendo que todos os dados serão perdidos",
		"account.delete.check2": "Esta ação não pode ser desfeita",
		"account.delete.type": "Digite DELETE para confirmar",
		"account.delete.cancel": "Cancelar",
		"account.delete.confirm.btn": "Excluir Conta",

		// Billing Settings
		"billing.current": "Plano Atual",
		"billing.ends": "Termina em: {date}",
		"billing.billed": "Faturado mensalmente - Próximo: {date}",
		"billing.usage": "Uso",
		"billing.groups.label": "Grupos",
		"billing.channels.label": "Canais",
		"billing.plans": "Planos Disponíveis",
		"billing.current.badge": "Atual",
		"billing.free.name": "Free",
		"billing.basic.name": "Basic",
		"billing.pro.name": "Pro",
		"billing.month": "/mês",
		"billing.canceling": "Cancelando...",
		"billing.cancel": "Cancelar Assinatura",
		"billing.change": "Alterar Plano",
		"billing.history": "Histórico de Faturamento",
		"billing.view": "Ver no Gumroad",
		"billing.cancel.title": "Cancelar Assinatura",
		"billing.cancel.desc":
			"Tem certeza que deseja cancelar sua assinatura? Você perderá o acesso aos recursos premium no final do seu período de faturamento.",
		"billing.keep": "Manter Assinatura",
		"billing.cancel.confirm": "Cancelar Assinatura",

		// Group Settings
		"group.settings.saved": "Configurações salvas",
		"group.settings.config": "Configuração",
		"group.settings.maxchannels": "Máx de Canais por Grupo",
		"group.settings.duplicates": "Permitir Duplicatas",
		"group.settings.autosort": "Classificação Automática de Canais",
		"group.settings.categories": "Categorias",
		"group.settings.addcategory": "Adicionar categoria",
		"group.settings.defaults": "Configurações Padrão",
		"group.settings.defaultview": "Visualização Padrão",
		"group.settings.grid": "Grade",
		"group.settings.list": "Lista",
		"group.settings.compact": "Compacto",
		"group.settings.sortorder": "Ordem de Classificação",
		"group.settings.sort.subscribers": "Inscritos ↓",
		"group.settings.sort.name": "Nome A-Z",
		"group.settings.saving": "Salvando...",
		"group.settings.save": "Salvar Configurações",

		// Appearance Settings
		"appearance.theme": "Tema",
		"appearance.light": "Claro",
		"appearance.dark": "Escuro",
		"appearance.nestfeed": "Groupify",

		// Dashboard Routes
		"dashboard.channels.title": "Todos os Canais",
		"dashboard.channels.desc": "Ver e gerenciar todos os canais do YouTube",
		"dashboard.animes.title": "Todos os Animes",
		"dashboard.animes.desc": "Ver e gerenciar todos os animes",
		"dashboard.websites.title": "Todos os Sites",
		"dashboard.websites.desc": "Ver e gerenciar todos os sites",

		// Share Links Page
		"sharelinks.page.title": "Links de Compartilhamento",
		"sharelinks.page.desc":
			"Gerenciar e monitorar todos os seus links de compartilhamento",
		"sharelinks.create": "Criar Novo Link",
		"sharelinks.select.title": "Selecionar um Grupo",
		"sharelinks.select.desc":
			"Escolha um grupo para criar um link de compartilhamento.",
		"sharelinks.nogroups": "Nenhum grupo encontrado. Crie um grupo primeiro.",
		"sharelinks.channels": "{count} canais",
		"sharelinks.all": "Todos os Links de Compartilhamento",

		// Group Detail Page
		"group.detail.breadcrumb": "Início",
		"group.detail.channels.count": "{count} canais",
		"group.detail.tab.channels": "Canais",
		"group.detail.tab.videos": "Vídeos",
		"group.detail.sync.error": "Falha ao sincronizar vídeos",
		"group.detail.settings.applied": "Configurações Aplicadas",
		"group.detail.settings.desc":
			"Suas configurações de grupo foram aplicadas.",

		// Group Edit/Create
		"group.edit.title": "Editar Grupo",
		"group.edit.desc": "Atualizar detalhes do seu grupo de canais",
		"group.edit.submit": "Salvar Alterações",
		"group.create.title": "Criar Grupo",
		"group.create.desc": "Organize seus canais do YouTube em grupos",
		"group.create.submit": "Criar",
		"group.edit.error": "Erro",
		"group.edit.error.desc": "Falha ao atualizar grupo. Tente novamente.",
		"group.create.error": "Erro",
		"group.create.error.desc": "Falha ao criar grupo. Tente novamente.",

		// Blog Post
		"blog.post.back": "Voltar ao Blog",
		"blog.post.written": "Escrito por {author}",
		"blog.post.author.desc":
			"Autor de artigos do Groupify. Apaixonado por produtividade e organização no YouTube.",
	},
	es: {
		collaborate_invite_title: "Invitar Colaboradores",
		collaborate_invite_desc:
			"Invita colaboradores a este grupo ingresando su dirección de correo electrónico y asignando un rol.",
		input_email_placeholder: "Ingresar correo electrónico del colaborador",
		collaborators_label: "Colaboradores",
		collaborators_empty: "Aún no hay colaboradores.",
		role_viewer: "Espectador",
		role_editor: "Editor",
		role_admin: "Administrador",
		perm_view: "Puede ver el contenido del grupo",
		perm_edit: "Puede editar el contenido del grupo",
		perm_admin: "Acceso administrativo total",
		allow_comments_label: "Permitir comentarios",
		share_link_desc:
			"Comparte este enlace con otros para permitirles ver o copiar este grupo.",
		copied: "¡Copiado!",
		copy: "Copiar",
		generating: "Generando...",
		generate_link: "Generar Enlace para Copiar",
		add: "Agregar",
		default_permission_title: "Permiso Predeterminado",
		share_link_title: "Enlace para Compartir",
		join_as: "Cualquiera con este enlace se unirá como {role}.",
		copy_link_title: "Enlace para Copiar Grupo",
		copy_link_desc:
			"Comparte este enlace con otros para permitirles copiar los canales de este grupo.",
		copy_destination_title: "Destino de Copia",
		copy_destination_new: "Un nuevo grupo",
		copy_destination_existing: "Un grupo existente",
		copy_alert_desc: "Esto copiará {count} canales al destino seleccionado.",
		copy_alert_info:
			"Este enlace permite a otros copiar los canales a sus propios grupos.",
		generate_copy_link: "Generar Enlace para Copiar",
		group_details_title: "Detalles del Grupo",
		channels: "Canales",
		share_settings_title: "Configuración de Compartir",
		share_settings_collab:
			"Los colaboradores tendrán acceso de {permission} a este grupo.",
		share_settings_copy:
			"Los destinatarios podrán copiar todos los canales a {destination}.",
		destination_new: "un nuevo grupo",
		destination_existing: "un grupo existente",
		share_group_title: "Compartir Grupo",
		share_group_description: "Comparte tu grupo con otros",
		back_to_group: "Volver al Grupo",
		collaborate_tab_title: "Colaborar",
		copy_group_tab_title: "Copiar Grupo",
		// Navigation
		"nav.features": "Características",
		"nav.integrations": "Integraciones",
		"nav.pricing": "Precios",
		"nav.reviews": "Reseñas",
		"nav.dashboard": "Panel",
		"nav.blog": "Blog",
		"nav.signin": "Iniciar Sesión",
		"nav.getstarted": "Comenzar",

		// Footer / About / Contact / Consent
		"footer.tagline":
			"La mejor forma de organizar, gestionar y compartir tus suscripciones de YouTube.",
		"footer.resources": "Recursos",
		"footer.community": "Comunidad",
		"footer.contact": "Contacto",
		"footer.about": "Acerca de",
		"footer.privacy": "Política de Privacidad",
		"footer.terms": "Términos del Servicio",
		"about.badge": "Sobre nosotros",
		"about.title": "Acerca de Groupify",
		"about.subtitle":
			"Ayudamos a los amantes de YouTube a domar sus suscripciones: organiza canales en grupos, curate lo que ver y compártelo todo con amigos.",
		"about.mission.title": "Nuestra misión",
		"about.mission.text":
			"YouTube es la videoteca más grande del mundo, pero gestionar cientos de canales es un caos. Groupify le da un hogar a cada canal: crea grupos de animes, noticias, fitness, cocina o lo que quieras, mantenlos organizados y comparte un solo enlace en lugar de un muro de recomendaciones.",
		"about.story.title": "Por qué lo creamos",
		"about.story.text":
			"Groupify nació de una necesidad personal: demasiadas suscripciones, demasiadas pilas de “ver más tarde” y ninguna buena forma de entregar una selección de canales a un amigo. Hoy es un panel completo donde conectas tu cuenta, agrupas tus canales, sincronizas sus últimos vídeos y compartes enlaces públicos con cualquiera.",
		"about.values.title": "Lo que nos importa",
		"about.value1.title": "Organización primero",
		"about.value1.desc":
			"Los grupos son el núcleo del producto. Fáciles de crear, de reordenar y siempre en sincronía con tu lista de canales.",
		"about.value2.title": "Compartir integrado",
		"about.value2.desc":
			"Cada grupo puede convertirse en un enlace público, para que tu curaduría llegue a tus amigos sin fricción.",
		"about.value3.title": "Privacidad respetada",
		"about.value3.desc":
			"Elecciones de cookies claras, anuncios no personalizados por defecto hasta que aceptes y formas sencillas de contactarnos sobre tus datos.",
		"about.cta.title": "¿Listo para organizar tus canales?",
		"about.cta.text":
			"Crea tu cuenta gratis y arma tu primer grupo en minutos — o lee el blog con consejos para tu vida en YouTube.",
		"contact.badge": "Contacto",
		"contact.title": "Ponte en contacto",
		"contact.subtitle":
			"¿Preguntas, comentarios o alianzas? Solemos responder en un día hábil.",
		"contact.email.title": "Escríbenos",
		"contact.email.desc":
			"Escribe directamente a nuestro equipo para soporte, facturación o privacidad.",
		"contact.email.button": "Enviar correo",
		"contact.community.title": "Comunidad en Discord",
		"contact.community.desc":
			"Chatea con otros usuarios, reporta errores y sigue las novedades en tiempo real.",
		"contact.community.button": "Unirse a Discord",
		"contact.help.title": "Centro de ayuda",
		"contact.help.desc":
			"Explora guías y respuestas a las preguntas más frecuentes sobre Groupify.",
		"contact.help.button": "Abrir centro de ayuda",
		"contact.response":
			"Para solicitudes de privacidad (acceso, corrección o eliminación de datos), envíanos un correo y responderemos en un plazo de 30 días conforme a la ley aplicable.",
		"consent.title": "Cookies y anuncios",
		"consent.text":
			"Usamos cookies esenciales y de análisis. Con tu consentimiento también mostramos anuncios personalizados vía Google AdSense; sin él, los anuncios permanecen no personalizados.",
		"consent.accept": "Aceptar todo",
		"consent.reject": "Solo no personalizados",
		"consent.learnMore": "Política de privacidad",

		// Login Page
		"login.welcome":
			"¡Bienvenido de vuelta! Por favor, inicia sesión en tu cuenta.",
		"login.title": "Iniciar Sesión",
		"login.subtitle": "Ingresa tu email y contraseña para acceder a tu panel",
		"login.description":
			"Ingresa tu email y contraseña para acceder a tu panel",
		"login.email": "Email",
		"login.email.placeholder": "Ingresa tu email",
		"login.password": "Contraseña",
		"login.password.placeholder": "Ingresa tu contraseña",
		"login.forgot": "¿Olvidaste tu contraseña?",
		"login.signin": "Iniciar Sesión",
		"login.signing": "Iniciando sesión...",
		"login.or": "O continúa con",
		"login.google": "Entra con Google",
		"login.discord": "Entra con Discord",
		"login.github": "GitHub",
		"login.noaccount": "¿No tienes una cuenta?",
		"login.signup": "Regístrate",
		"login.backhome": "Volver al inicio",
		"login.demo": "Credenciales de demostración:",
		"login.demo.email": "Email: demo@example.com",
		"login.demo.password": "Contraseña: password",
		"login.validation.email.required": "El email es requerido",
		"login.validation.email.invalid":
			"Por favor, ingresa una dirección de email válida",
		"login.validation.password.required": "La contraseña es requerida",
		"login.validation.password.min":
			"La contraseña debe tener al menos 6 caracteres",

		// Register Page
		"register.welcome":
			"Crea tu cuenta y comienza a organizar tus canales de YouTube.",
		"register.title": "Crear Cuenta",
		"register.description": "Ingresa tus datos para crear tu cuenta",
		"register.name": "Nombre Completo",
		"register.name.placeholder": "Ingresa tu nombre completo",
		"register.email": "Email",
		"register.email.placeholder": "Ingresa tu email",
		"register.password": "Contraseña",
		"register.password.placeholder": "Crea una contraseña",
		"register.confirmpassword": "Confirmar Contraseña",
		"register.confirmpassword.placeholder": "Confirma tu contraseña",
		"register.terms": "Acepto los",
		"register.terms.link": "Términos de Servicio",
		"register.privacy": "y",
		"register.privacy.link": "Política de Privacidad",
		"register.signup": "Crear Cuenta",
		"register.signing": "Creando cuenta...",
		"register.or": "O continúa con",
		"register.google": "Google",
		"register.discord": "Discord",
		"register.hasaccount": "¿Ya tienes una cuenta?",
		"register.signin": "Iniciar sesión",
		"register.backhome": "Volver al inicio",
		"register.validation.name.required": "El nombre completo es requerido",
		"register.validation.name.min":
			"El nombre debe tener al menos 2 caracteres",
		"register.validation.email.required": "El email es requerido",
		"register.validation.email.invalid":
			"Por favor, ingresa una dirección de email válida",
		"register.validation.password.required": "La contraseña es requerida",
		"register.validation.password.min":
			"La contraseña debe tener al menos 6 caracteres",
		"register.validation.confirmpassword.required":
			"Por favor, confirma tu contraseña",
		"register.validation.confirmpassword.match": "Las contraseñas no coinciden",

		// Página de Olvidé mi Contraseña
		"forgot.title": "Restablecer Contraseña",
		"forgot.description":
			"Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.",
		"forgot.email": "Correo Electrónico",
		"forgot.email.placeholder": "Ingresa tu dirección de correo electrónico",
		"forgot.send": "Enviar Enlace de Restablecimiento",
		"forgot.sending": "Enviando...",
		"forgot.error":
			"No se pudo enviar el correo de restablecimiento. Inténtalo de nuevo.",
		"forgot.backsignin": "Volver al Inicio de Sesión",
		"forgot.success.title": "Revisa tu Correo",
		"forgot.success.description":
			"Te hemos enviado un enlace para restablecer tu contraseña a",
		"forgot.success.next.title": "¿Qué hacer ahora?",
		"forgot.success.next.step1": "1. Revisa tu bandeja de entrada",
		"forgot.success.next.step2":
			"2. Haz clic en el enlace de restablecimiento en el correo",
		"forgot.success.next.step3": "3. Crea una nueva contraseña",
		"forgot.success.noemail.title": "¿No recibiste el correo?",
		"forgot.success.noemail.description":
			"Revisa tu carpeta de spam o intenta reenviar el correo.",
		"forgot.success.resend": "Reenviar Correo",
		"forgot.success.backsignin": "Volver al Inicio de Sesión",

		// Hero Section
		"hero.badge": "Nuevo: Integración Crunchyroll",
		"hero.title": "Organiza Tus Canales de YouTube Como un Profesional",
		"hero.subtitle":
			"Organiza tus canales de YouTube con grupos personalizados, colabora con tu equipo y accede a análisis detallados — todo en un panel intuitivo.",
		"hero.starttrial": "Iniciar Prueba Gratuita",
		"hero.watchdemo": "Ver Demo",
		"hero.freetrial": "Prueba gratuita de 14 días",
		"hero.nocreditcard": "No se requiere tarjeta de crédito",
		"hero.cancelanytime": "Cancela en cualquier momento",

		// Stats
		"stats.activeusers": "Usuarios Activos",
		"stats.channelsmanaged": "Canales Gestionados",
		"stats.groupscreated": "Grupos Creados",
		"stats.uptime": "Tiempo Activo",

		// Features
		"features.badge": "Características",
		"features.title": "Todo Lo Que Necesitas",
		"features.subtitle":
			"Características poderosas diseñadas para ayudarte a gestionar, organizar y hacer crecer tu portafolio de canales de YouTube.",
		"features.smartorg.title": "Organización Inteligente de Grupos",
		"features.smartorg.desc":
			"Crea grupos jerárquicos con iconos personalizados y organiza tus canales de YouTube de manera eficiente.",
		"features.collaboration.title": "Colaboración y Compartir",
		"features.collaboration.desc":
			"Comparte grupos con miembros del equipo, establece permisos y colabora en la gestión de canales.",
		"features.analytics.title": "Análisis Avanzados",
		"features.analytics.desc":
			"Rastrea el crecimiento de suscriptores, ve estatísticas y analiza el rendimiento de canales con gráficos detallados.",
		"features.youtube.title": "Integración API de YouTube",
		"features.youtube.desc":
			"Sincroniza automáticamente datos de canales, conteo de suscriptores y estatísticas de videos en tiempo real.",
		"features.team.title": "Gestión de Equipo",
		"features.team.desc":
			"Invita colaboradores con diferentes niveles de permisos y gestiona el acceso a tus grupos.",
		"features.responsive.title": "Design Responsivo",
		"features.responsive.desc":
			"Accede a tu panel desde cualquier dispositivo con nuestra interfaz completamente responsiva y optimizada para móviles.",

		// Integrations
		"integrations.badge": "Integraciones",
		"integrations.title": "Integraciones Poderosas",
		"integrations.subtitle":
			"Conecta con tus plataformas y herramientas favoritas para potenciar tu flujo de trabajo.",
		"integrations.crunchyroll.desc": "Rastrea conteúdo de anime em plataformas",
		"integrations.youtube.desc":
			"Sincronización de datos de canal em tempo real",
		"integrations.export.desc":
			"Exporta seus grupos e canais para a comunidade",

		// Landing Page - New Content
		"landing.hero.badge": "Ahora con Extensión de Navegador",
		"landing.hero.title": "Organiza Tu YouTube Como Nunca Antes",
		"landing.hero.subtitle":
			"Groupify te ayuda a organizar, gestionar y compartir tus suscripciones de YouTube. Crea grupos personalizados, colabora con equipos y nunca pierdas el control de tus canales favoritos.",
		"landing.hero.cta.primary": "Iniciar Prueba Gratuita",
		"landing.hero.cta.secondary": "Ver Demo",
		"landing.hero.trust1": "No se requiere tarjeta de crédito",
		"landing.hero.trust2": "Prueba gratuita de 14 días",
		"landing.hero.trust3": "Cancela en cualquier momento",
		"landing.hero.preview": "Panel de Groupify",

		// Landing Page - Features Section
		"landing.features.title": "Todo Lo Que Necesitas para Organizar YouTube",
		"landing.features.subtitle":
			"Características poderosas diseñadas para creadores de contenido, equipos y entusiastas de YouTube",
		"landing.features.smart.title": "Organización Inteligente",
		"landing.features.smart.desc":
			"Crea grupos ilimitados con categorías personalizadas. Anida grupos dentro de grupos para máxima flexibilidad en la gestión de tus suscripciones de YouTube.",
		"landing.features.share.title": "Compartir y Colaborar",
		"landing.features.share.desc":
			"Genera enlaces compartibles para permitir que otros vean o copien tus grupos. Perfecto para creadores de contenido, equipos y comunidades.",
		"landing.features.permissions.title": "Permisos de Equipo",
		"landing.features.permissions.desc":
			"Controla el acceso con permisos granulares. Asigna roles de solo visualización, editor o administrador para gestionar quién puede modificar tus grupos.",
		"landing.features.bulk.title": "Operaciones Masivas",
		"landing.features.bulk.desc":
			"Ahorra tiempo con acciones por lotes poderosas. Agrega, elimina o mueve varios canales entre grupos en segundos.",
		"landing.features.extension.title": "Integración con Extensión",
		"landing.features.extension.desc":
			"Nuestra extensión de navegador te permite agregar canales directamente desde YouTube. Organización con un clic mientras navegas.",
		"landing.features.everywhere.title": "Funciona en Cualquier Lugar",
		"landing.features.everywhere.desc":
			"Accede a tus canales organizados desde cualquier dispositivo. Aplicación web y extensiones de navegador para Chrome, Firefox y Safari.",

		// Landing Page - Browser Extension Section
		"landing.extension.badge": "Extensión de Navegador",
		"landing.extension.title": "Agrega Canales Mientras Navegas",
		"landing.extension.subtitle":
			"Nuestra extensión de navegador se integra perfectamente con YouTube. Cuando encuentres un canal que quieras guardar, solo haz clic en el icono de Groupify y agrégalo a cualquier grupo instantáneamente.",
		"landing.extension.success": "Canal agregado al grupo",
		"landing.extension.subscribers": "suscriptores",

		// Landing Page - Testimonials Section
		"landing.testimonials.title": "Amado por Creadores de Contenido",
		"landing.testimonials.subtitle":
			"Mira lo que nuestros usuarios están diciendo sobre Groupify",
		"landing.testimonials.alex.content":
			"Groupify ha transformado completamente cómo gestiono mis suscripciones de YouTube. ¡Finalmente puedo mantener mi contenido educativo separado del entretenimiento!",
		"landing.testimonials.sarah.content":
			"La capacidad de compartir grupos curados con mi equipo ha sido un cambio radical. Podemos compartir rápidamente insights de la industria y análisis de competidores.",
		"landing.testimonials.mike.content":
			"He probado muchas herramientas, pero Groupify es la única que realmente entiende cómo trabajan los creadores de contenido. ¡La función de grupos anidados es brillante!",

		// Landing Page - Pricing Section
		"landing.pricing.title": "Precios Simples y Transparentes",
		"landing.pricing.subtitle":
			"Elige el plan que se adapte a tus necesidades. Todos los planes incluyen una prueba gratuita de 14 días.",
		"landing.pricing.free.name": "Gratis",
		"landing.pricing.free.desc": "Perfecto para comenzar",
		"landing.pricing.pro.name": "Pro",
		"landing.pricing.pro.desc": "Mejor para creadores de contenido",
		"landing.pricing.business.name": "Business",
		"landing.pricing.business.desc": "Para equipos y agencias",
		"landing.pricing.cta.free": "Comenzar Gratis",
		"landing.pricing.cta.pro": "Iniciar Prueba Pro",
		"landing.pricing.cta.business": "Obtener Business",
		"landing.pricing.mostpopular": "MÁS POPULAR",

		// Landing Page - CTA Section
		"landing.cta.title": "¿Listo para Organizar Tu YouTube?",
		"landing.cta.subtitle":
			"Únete a miles de creadores de contenido y equipos que confían en Groupify para gestionar sus suscripciones de YouTube.",
		"landing.cta.primary": "Comenzar Gratis",
		"landing.cta.secondary": "Unirse a la Comunidad",

		// Testimonials
		"testimonials.badge": "Testimonios",
		"testimonials.title": "Amado por Creadores",
		"testimonials.subtitle":
			"Ve lo que creadores de contenido y agencias están diciendo sobre Groupify.",
		"testimonials.alex.content":
			"Esta herramienta ha revolucionado cómo gestiono mis más de 50 canales de YouTube. ¡La función de agrupación es revolucionária!",
		"testimonials.sarah.content":
			"Perfecto para nuestra agencia. Ahora podemos organizar canales de clientes de manera eficiente y compartir acceso con miembros del equipo.",
		"testimonials.mike.content":
			"El panel de análisis me da insights que nunca tuve antes. Altamente recomendado para creadores serios.",

		// Pricing
		"pricing.badge": "Precios",
		"pricing.title": "Precios Simples y Transparentes",
		"pricing.subtitle":
			"Elige el plan adecuado para ti. Actualiza o degrada en cualquier momento.",
		"pricing.popular": "Más Popular",
		"pricing.free.name": "Grátis",
		"pricing.free.desc": "Perfeito para começar",
		"pricing.pro.name": "Pro",
		"pricing.pro.desc": "Para criadores de contenido serios",
		"pricing.business.name": "Empresarial",
		"pricing.business.desc": "Para agências e equipes",
		"pricing.getstarted": "Começar",
		"pricing.starttrial": "Iniciar Prueba Gratuita",
		"pricing.contactsales": "Contactar Ventas",

		// CTA
		"cta.badge": "Listo para Lanzar",
		"cta.title": "¿Listo para Comenzar?",
		"cta.subtitle":
			"Únete a miles de creadores de contenido que já estão usando o Groupify para organizar y hacer crecer su presencia en YouTube.",

		// Footer
		"footer.description":
			"La herramienta definitiva para organizar y gestionar tu portafolio de canales de YouTube con diseño moderno y características poderosas.",
		"footer.product": "Producto",
		"footer.support": "Soporte",
		"footer.company": "Empresa",
		"footer.copyright":
			"Todos los derechos reservados. Hecho con ❤️ para creadores de contenido.",

		// Dashboard
		"dashboard.greeting.morning": "Buenos días",
		"dashboard.greeting.afternoon": "Buenas tardes",
		"dashboard.greeting.evening": "Buenas noches",
		"dashboard.greeting.subtitle": "Esto es lo que sucede con tus grupos hoy",
		"dashboard.quickactions": "Acciones Rápidas",
		"dashboard.create.group": "Crear Grupo",
		"dashboard.create.group.desc": "Organizar canales",
		"dashboard.view.channels": "Ver Canales",
		"dashboard.view.channels.desc": "Gestionar todo",
		"dashboard.share.links": "Enlaces Compartidos",
		"dashboard.share.links.desc": "Gestionar acceso",
		"dashboard.upgrade.plan": "Mejorar Plan",
		"dashboard.upgrade.plan.desc": "Más funciones",
		"dashboard.overview": "Resumen",
		"dashboard.yourgroups": "Tus Grupos",
		"dashboard.tab.groups": "Grupos",
		"dashboard.tab.shared": "Compartidos",
		"dashboard.recent.title": "Grupos Recientes",
		"dashboard.recent.features": "Funciones Recientes",
		"dashboard.recent.all": "Todos",
		"dashboard.shared.title": "Grupos Compartidos",
		"dashboard.shared.access": "Acceso Compartido",
		"dashboard.shared.subtitle": "Grupos compartidos contigo",

		// Groups
		"groups.title": "Grupos",
		"groups.description": "Gestiona tus grupos de canales de YouTube",
		"groups.new": "Nuevo Grupo",
		"groups.loading": "Cargando grupos...",
		"groups.error.title": "Error al Cargar Grupos",
		"groups.error.description":
			"No se pudieron cargar los grupos. Inténtalo de nuevo.",

		// Group Form
		"group.form.name": "Nombre",
		"group.form.name.placeholder": "Mi Grupo",
		"group.form.description": "Descripción",
		"group.form.description.placeholder": "¿De qué trata este grupo?",
		"group.form.category": "Categoría",
		"group.form.icon": "Icono",
		"group.form.parent": "Grupo Padre (Opcional)",
		"group.form.parent.none": "Ninguno (nivel superior)",
		"group.form.parent.hint": "Crea subgrupos para organizar jerárquicamente",
		"group.form.cancel": "Cancelar",
		"group.form.creating": "Creando...",
		"group.form.submit": "Enviar",
		"group.form.shelf": "Activar Estante de Grupos",
		"group.form.validation.required": "Requerido",
		"group.form.validation.max50": "Máx 50 caracteres",
		"group.form.validation.pattern":
			"Solo letras, números, espacios, guiones y guiones bajos",
		"group.form.category.placeholder": "Selecciona una categoría",
		"group.form.icon.placeholder": "Selecciona un icono",

		// Blog
		"blog.title": "Últimas Actualizaciones",
		"blog.brand": "Blog do Groupify",
		"blog.search": "Buscar...",
		"blog.featured": "Destacado",
		"blog.trending": "Tendencia",
		"blog.read": "Leer Artículo",
		"blog.author.team": "Equipo Groupify",
		"blog.results": "Resultados",
		"blog.allposts": "Todos los Posts",
		"blog.none.title": "No se encontraron posts",
		"blog.none.description": "No hay posts en esta categoría.",
		"blog.prev": "Anterior",
		"blog.next": "Siguiente",
		"blog.category.all": "Todos",
		"blog.category.product": "Producto",
		"blog.category.engineering": "Ingeniería",
		"blog.category.design": "Diseño",
		"blog.category.community": "Comunidad",
		"blog.category.tutorials": "Tutoriales",

		// Not Found
		"notfound.description": "La página que buscas no existe.",
		"notfound.goback": "Volver",
		"notfound.startover": "Empezar de nuevo",

		// Sidebar
		"sidebar.dashboard": "Panel",
		"sidebar.groups": "Grupos",
		"sidebar.channels": "Canales",
		"sidebar.animes": "Animes",
		"sidebar.websites": "Sitios Web",
		"sidebar.settings": "Configuración",

		// Social Login Labels
		"login.welcome.badge": "Bienvenido de nuevo",
		"register.welcome.badge": "Únete a Groupify",
		"login.social.google": "Google",
		"login.social.discord": "Discord",

		// Channels
		"channels.add.search": "Buscar",
		"channels.add.fetching": "Obteniendo...",
		"channels.add.fetch": "Obtener",
		"channels.add.added": "Agregado",
		"channels.add.add": "Agregar",
		"groupshelf.title": "Estante de Grupos",

		// Videos
		"videos.all.channels": "Todos los canales",

		// Share Links
		"sharelinks.noexpiration": "Sin expiración",
		"sharelinks.unknown": "Desconocido",

		// Groups Table
		"groups.table.search": "Buscar grupos...",
		"groups.table.name": "Nombre",
		"groups.table.category": "Categoría",
		"groups.table.channels": "Canales",
		"groups.table.created": "Creado",
		"groups.table.actions": "Acciones",
		"groups.table.loading": "Cargando grupos...",
		"groups.table.noresults": 'Ningún grupo coincide con "{search}"',
		"groups.table.noresults.hint": "Intenta ajustar tus términos de búsqueda",
		"groups.table.empty": "No se encontraron grupos",
		"groups.table.subgroup": "(subgrupo)",
		"groups.table.addsubgroup.sr": "Añadir subgrupo",
		"groups.table.openmenu": "Abrir menú",
		"groups.table.viewdetails": "Ver detalles",
		"groups.table.edit": "Editar",
		"groups.table.addsubgroup.menu": "Añadir Subgrupo",
		"groups.table.moveup": "Subir",
		"groups.table.movedown": "Bajar",
		"groups.table.delete": "Eliminar",
		"groups.table.itemsperpage": "Elementos por página:",
		"groups.table.updated": "Orden de grupos actualizado",
		"groups.table.updated.desc": "El orden de los grupos se ha guardado",
		"groups.table.update.error": "Error al actualizar el orden de los grupos",
		"groups.table.update.error.desc": "Inténtalo de nuevo más tarde",
		"groups.table.delete.confirm":
			'¿Estás seguro de que deseas eliminar "{name}"? Esta acción no se puede deshacer.',
		"groups.table.deleted": "Grupo eliminado con éxito",
		"groups.table.deleted.desc": '"{name}" ha sido eliminado.',
		"groups.table.delete.error": "Error al eliminar el grupo",
		"groups.table.delete.error.desc": "Inténtalo de nuevo más tarde.",
		"groups.table.moved": "Grupo movido",
		"groups.table.moved.desc": "{name} movido {direction}",
		"groups.table.move.error": "Error al mover el grupo",
		"groups.table.move.error.desc": "Inténtalo de nuevo más tarde",

		// Channels Table
		"channels.table.search": "Buscar canales...",
		"channels.table.channel": "Canal",
		"channels.table.actions": "Acciones",
		"channels.table.empty": "No se encontraron canales.",
		"channels.table.visit": "Visitar canal",
		"channels.table.remove": "Eliminar del grupo",
		"channels.table.visit.short": "Visitar",
		"channels.table.remove.short": "Eliminar",
		"channels.table.sort.recent": "Añadidos Recientemente",
		"channels.table.sort.nameaz": "Nombre (A a Z)",
		"channels.table.sort.nameza": "Nombre (Z a A)",
		"channels.table.view.grid": "Vista de cuadrícula",
		"channels.table.view.list": "Vista de lista",
		"channels.table.view.compact": "Vista compacta",
		"channels.table.openmenu": "Abrir menú",

		// All Channels
		"all.channels.search": "Buscar canales o grupos...",
		"all.channels.error": "Error al cargar canales: {message}",
		"all.channels.channel": "Canal",
		"all.channels.group": "Grupo",
		"all.channels.actions": "Acciones",
		"all.channels.loading": "Cargando canales...",
		"all.channels.empty": "No se encontraron canales.",
		"all.channels.assign": "Asignar Grupo",
		"all.channels.visit": "Visitar canal",
		"all.channels.changegroup": "Cambiar grupo",
		"all.channels.delete": "Eliminar canal",
		"all.channels.itemsperpage": "Elementos por página",
		"all.channels.itemsPerPagePlaceholder": "Elementos por página",
		"all.channels.openmenu": "Abrir menú",
		"all.channels.notfound": "No se encontraron canales",
		"all.channels.sync":
			"Sincroniza tu cuenta de Google para importar tus canales de YouTube.",
		"all.channels.sync.link": "Ir a configuración",
		"all.channels.syncDescription": "Sincroniza tu cuenta de Google para",

		// All Animes
		"all.animes.search": "Buscar animes...",
		"all.animes.error": "Error al cargar canales: {message}",
		"all.animes.channel": "Canal",
		"all.animes.group": "Grupo",
		"all.animes.actions": "Acciones",
		"all.animes.loading": "Cargando canales...",
		"all.animes.empty": "No se encontraron animes.",
		"all.animes.assign": "Asignar Grupo",
		"all.animes.visit": "Visitar anime",
		"all.animes.changegroup": "Cambiar grupo",
		"all.animes.delete": "Eliminar canal",
		"all.animes.itemsperpage": "Elementos por página",
		"all.animes.itemsPerPagePlaceholder": "Elementos por página",
		"all.animes.openmenu": "Abrir menú",

		// All Websites
		"all.websites.search": "Buscar sitios web...",
		"all.websites.error": "Error al cargar sitios web.",
		"all.websites.website": "Sitio web",
		"all.websites.url": "URL",
		"all.websites.group": "Grupo",
		"all.websites.actions": "Acciones",
		"all.websites.loading": "Cargando...",
		"all.websites.empty": "No se encontraron sitios web.",
		"all.websites.visit": "Visitar sitio web",
		"all.websites.delete": "Eliminar",
		"all.websites.openmenu": "Abrir menú",

		// Group Details
		"group.details.shelf": "Estante del Grupo",
		"group.details.edit": "Editar Grupo",
		"group.details.share": "Compartir",
		"group.details.addchannel": "Añadir Canal",
		"group.details.created": "Creado",
		"group.details.channels": "Canales",

		// Group List
		"group.list.empty.title": "Aún no hay grupos",
		"group.list.empty.desc":
			"Comienza a organizar tus canales de YouTube en grupos",
		"group.list.create": "Crear Tu Primer Grupo",
		"group.list.channels": "{count} canales",

		// Dashboard Stats
		"stats.total.groups": "Total de Grupos",
		"stats.total.channels.groups": "Total de Canales en Grupos",
		"stats.shared.groups": "Grupos Compartidos",
		"stats.total.youtube": "Total de Canales de YouTube",
		"stats.total.anime": "Total de Canales de Anime",

		// Recent Activity
		"recent.feature.organize.title": "Organizar con Grupos",
		"recent.feature.organize.desc":
			"Crea grupos ilimitados para organizar tus canales de YouTube por tema, proyecto o cualquier criterio que necesites.",
		"recent.feature.organize.badge": "Funcionalidad Principal",
		"recent.feature.share.title": "Compartir y Colaborar",
		"recent.feature.share.desc":
			"Genera enlaces compartibles para que otros vean o copien tus grupos. Perfecto para equipos y comunidades.",
		"recent.feature.share.badge": "Popular",
		"recent.feature.permissions.title": "Permisos de Equipo",
		"recent.feature.permissions.desc":
			"Controla el acceso con permisos de vista, edición o administración. Gestiona quién puede modificar tus grupos.",
		"recent.feature.permissions.badge": "Pro",
		"recent.feature.bulk.title": "Operaciones Masivas",
		"recent.feature.bulk.desc":
			"Añade, elimina o mueve varios canales a la vez. Ahorra tiempo con potentes acciones por lote.",
		"recent.feature.extension.title": "Integración con Extensión",
		"recent.feature.extension.desc":
			"Usa nuestra extensión de navegador para añadir canales rápidamente mientras navegas por YouTube directamente.",
		"recent.feature.extension.badge": "Nuevo",
		"recent.tip.title": "Consejo Profesional",
		"recent.tip.desc":
			"Usa subgrupos para crear jerarquías anidadas. Perfecto para organizar grandes colecciones por subtema o fase del proyecto.",

		// Recommendation Cards
		"rec.crunchyroll.badge": "Nueva Integración",
		"rec.crunchyroll.anime": "Anime",
		"rec.crunchyroll.title": "Integración Crunchyroll",
		"rec.crunchyroll.desc":
			"Combina perfectamente contenido de anime de YouTube y Crunchyroll",
		"rec.crunchyroll.overlay":
			"La experiencia definitiva de seguimiento de animes",
		"rec.crunchyroll.unlock": "Desbloquea la experiencia completa de anime",
		"rec.crunchyroll.feature1": "Sigue animes en ambas plataformas",
		"rec.crunchyroll.feature2": "Controla todas tus colecciones",
		"rec.crunchyroll.feature3": "Descubre nuevos animes",
		"rec.crunchyroll.feature4": "Comparte colecciones seleccionadas",
		"rec.crunchyroll.connect":
			"Conecta tu cuenta de Crunchyroll para organizar todo tu contenido de anime favorito en un solo lugar.",
		"rec.crunchyroll.button": "Conocer Crunchyroll",
		"rec.support.title": "Apoya Este Proyecto",
		"rec.support.desc":
			"Ayúdanos a mantener vivo y en crecimiento el YouTube Group Manager",
		"rec.support.text": "Tu apoyo nos ayuda a:",
		"rec.support.feature1": "Mantener la infraestructura del servidor",
		"rec.support.feature2":
			"Desarrollar nuevas funciones como la integración de Crunchyroll",
		"rec.support.feature3": "Mejorar la funcionalidad existente",
		"rec.support.feature4": "Mantener el servicio gratuito para todos",
		"rec.support.onetime": "Único",
		"rec.support.monthly": "Mensual",
		"rec.support.cancel": "Cancelar en cualquier momento",
		"rec.support.secure": "Pago único seguro",
		"rec.support.donate": "Donar ${amount} {type}",
		"rec.support.footer":
			"El 100% de las donaciones se destinan al desarrollo y costos del servidor",

		// Shared Groups Overview
		"shared.overview.empty.title": "Aún no hay grupos compartidos",
		"shared.overview.empty.desc":
			"Los grupos compartidos contigo aparecerán aquí",
		"shared.overview.owned": "Propiedad de {name}",
		"shared.overview.progress": "Progreso de Canales",
		"shared.overview.shared": "Compartido",
		"shared.overview.activity": "Actividad",
		"shared.overview.collaborators": "Colaboradores",
		"shared.overview.views": "Vistas",

		// Top Channels
		"top.channels.title": "Canales con Mejor Rendimiento",
		"top.channels.desc": "Tus canales con más suscriptores y participación",
		"top.channels.search": "Buscar canales...",
		"top.channels.channel": "Canal",
		"top.channels.group": "Grupo",
		"top.channels.subscribers": "Suscriptores",
		"top.channels.growth": "Crecimiento en 30 Días",
		"top.channels.views": "Vistas Totales",
		"top.channels.views30": "Vistas en 30 Días",
		"top.channels.videos": "{count} videos",
		"top.channels.empty": "No se encontraron canales.",

		// Upgrade Plan Modal
		"upgrade.title": "Mejorar Tu Plan",
		"upgrade.desc.channels":
			"Has alcanzado el número máximo de canales permitidos en tu plan actual.",
		"upgrade.desc.groups":
			"Has alcanzado el número máximo de grupos permitidos en tu plan actual.",
		"upgrade.body.channels":
			"Para añadir más canales, mejora tu plan para desbloquear más funciones.",
		"upgrade.body.groups":
			"Para crear más grupos, mejora tu plan para desbloquear más funciones.",
		"upgrade.cancel": "Cancelar",
		"upgrade.button": "Mejorar Plan",

		// YouTube Connect Modal
		"youtube.connect.title": "Conectar Tu Cuenta de YouTube",
		"youtube.connect.desc": "Aún no tienes ningún canal de YouTube conectado.",
		"youtube.connect.body":
			"Para organizar tus suscripciones de YouTube y ver sus últimos videos, conecta tu cuenta de Google con suscripciones de YouTube en la configuración de tu cuenta.",
		"youtube.connect.later": "Quizás Después",
		"youtube.connect.settings": "Ir a Configuración de la Cuenta",

		// Onboarding Tour
		"onboarding.back": "Atrás",
		"onboarding.skip": "Saltar tour",
		"onboarding.next": "Siguiente",
		"onboarding.finish": "Finalizar",
		"onboarding.step": "Paso {current} de {total}",

		// Support
		"support.badge": "Centro de Ayuda y Comunidad",
		"support.title1": "¿Cómo podemos",
		"support.title2": "ayudarte",
		"support.title3": "hoy?",
		"support.subtitle":
			"Ya sea que estés solucionando un problema o quieras ayudar a dar forma al futuro de la organización de YouTube, estamos a un clic de distancia.",
		"support.community.title": "Únete a la Comunidad",
		"support.community.desc":
			"Obtén ayuda instantánea de nuestro equipo y otros usuarios de Groupify. Comparte tu configuración, sugiere nuevas funciones y mantente actualizado.",
		"support.community.members": "Más de 1k Miembros",
		"support.community.beta": "Acceso Beta",
		"support.community.button": "Abrir Discord",
		"support.feature1.title": "Solución de Problemas en Tiempo Real",
		"support.feature1.desc":
			"Acceso directo a nuestros desarrolladores para soluciones rápidas.",
		"support.feature2.title": "Soporte Prioritario",
		"support.feature2.desc":
			"Los miembros de Discord reciben tiempos de respuesta más rápidos.",
		"support.feature3.title": "Solicitudes de Funciones",
		"support.feature3.desc":
			"Vota por las próximas funciones que construiremos.",
		"support.email.title": "Soporte por Correo Electrónico",
		"support.email.desc":
			"¿Necesitas una respuesta formal? Envíanos un correo y nuestro equipo de soporte te responderá en 24 horas.",
		"support.email.address": "admin@nestfeed.app",
		"support.oss.title": "Código Abierto",
		"support.oss.desc":
			"Nuestra extensión principal es de código abierto. Explora el código, reporta errores técnicos o contribuye en GitHub.",
		"support.oss.button": "Ver en GitHub",
		"support.footer": "(c) 2025 Groupify. Todos los derechos reservados.",

		// Share Page
		"share.loading.title": "Cargando...",
		"share.loading.desc": "Obteniendo información del grupo...",
		"share.error.expired": "Enlace Expirado",
		"share.error.title": "Error",
		"share.error.expired.desc":
			"Este enlace de compartir ha expirado y ya no es válido.",
		"share.error.loading.desc": "Error al cargar los datos del grupo",
		"share.alert.expired":
			"Los enlaces de compartir tienen un período de validez limitado. Contacta a la persona que compartió este enlace para obtener uno nuevo.",
		"share.button.dashboard": "Ir al Panel",
		"share.card.collab": "Unirse a la Colaboración",
		"share.card.copy": "Copiar Grupo",
		"share.card.collab.desc": 'Has sido invitado a colaborar en "{name}"',
		"share.card.copy.desc": 'Copiar todos los canales de "{name}" a tu cuenta',
		"share.group.unknown": "Grupo Desconocido",
		"share.label.unknown": "Desconocido",
		"share.desc.none": "No hay descripción disponible",
		"share.channels": "Canales",
		"share.permission.alert": "Te unirás como permiso de {permission}.",
		"share.permission.view": " Solo podrás ver canales y grupos",
		"share.permission.edit":
			" Podrás añadir, eliminar y editar grupos y canales.",
		"share.permission.admin":
			" Tendrás control total sobre el grupo y podrás invitar a otros.",
		"share.copy.alert": "Esto copiará todos los {count} canales a tu cuenta.",
		"share.cancel": "Cancelar",
		"share.joining": "Uniéndose...",
		"share.copying": "Copiando...",
		"share.join": "Unirse al Grupo",
		"share.copy.btn": "Copiar Canales",

		// Subscription Confirm
		"subscription.confirming": "Confirmando tu correo electrónico",
		"subscription.confirming.desc":
			"Por favor espera mientras validamos tu enlace de confirmación...",
		"subscription.failed": "Confirmación fallida",
		"subscription.failed.desc":
			"No pudimos verificar tu dirección de correo electrónico. El enlace puede haber expirado o ser inválido.",
		"subscription.success": "¡Correo confirmado!",
		"subscription.success.desc":
			"Tu correo electrónico ha sido verificado con éxito. Ahora puedes acceder a todas las funciones de tu cuenta.",
		"subscription.dashboard": "Continuar al Panel",
		"subscription.error.default": "Error al confirmar la suscripción",

		// Forgot Password Confirm
		"forgot.confirm.title": "Restablecer tu contraseña",
		"forgot.confirm.desc": "Ingresa tu nueva contraseña para restablecerla.",
		"forgot.confirm.newpassword": "Nueva Contraseña",
		"forgot.confirm.confirmpassword": "Confirmar Contraseña",
		"forgot.confirm.reset": "Restablecer contraseña",
		"forgot.confirm.back": "Volver a iniciar sesión",
		"forgot.confirm.error.match": "Las contraseñas no coinciden",
		"forgot.confirm.success": "Contraseña restablecida con éxito",
		"forgot.confirm.error.default":
			"Error al restablecer la contraseña. Inténtalo de nuevo.",

		// Settings
		"settings.title": "Configuración",
		"settings.desc": "Gestiona tus preferencias",
		"settings.tab.billing": "Facturación",
		"settings.tab.account": "Cuenta",
		"settings.tab.appearance": "Apariencia",
		"settings.tab.groups": "Grupos",

		// Account Settings
		"account.social": "Inicio de Sesión Social",
		"account.google": "Google",
		"account.connected": "Conectado",
		"account.notconnected": "No conectado",
		"account.disconnect": "Desconectar",
		"account.connect": "Conectar",
		"account.discord": "Discord",
		"account.password.section": "Contraseña",
		"account.newpassword": "Nueva Contraseña",
		"account.confirmpassword": "Confirmar Contraseña",
		"account.updatepassword": "Actualizar Contraseña",
		"account.tour": "Tour",
		"account.retour": "Rehacer Tour de Onboarding",
		"account.retour.desc": "Iniciar el tour guiado nuevamente",
		"account.retour.button": "Rehacer Tour",
		"account.danger": "Zona de Peligro",
		"account.delete": "Eliminar Cuenta",
		"account.delete.confirm": "¿Eliminar Cuenta?",
		"account.delete.irreversible": "Esto no se puede deshacer.",
		"account.delete.body":
			"Todos tus datos, incluyendo grupos, análisis y configuraciones, serán eliminados permanentemente.",
		"account.delete.check1": "Entiendo que todos los datos se perderán",
		"account.delete.check2": "Esta acción no se puede deshacer",
		"account.delete.type": "Escribe DELETE para confirmar",
		"account.delete.cancel": "Cancelar",
		"account.delete.confirm.btn": "Eliminar Cuenta",

		// Billing Settings
		"billing.current": "Plan Actual",
		"billing.ends": "Termina el: {date}",
		"billing.billed": "Facturado mensualmente - Próximo: {date}",
		"billing.usage": "Uso",
		"billing.groups.label": "Grupos",
		"billing.channels.label": "Canales",
		"billing.plans": "Planes Disponibles",
		"billing.current.badge": "Actual",
		"billing.free.name": "Free",
		"billing.basic.name": "Basic",
		"billing.pro.name": "Pro",
		"billing.month": "/mes",
		"billing.canceling": "Cancelando...",
		"billing.cancel": "Cancelar Suscripción",
		"billing.change": "Cambiar Plan",
		"billing.history": "Historial de Facturación",
		"billing.view": "Ver en Gumroad",
		"billing.cancel.title": "Cancelar Suscripción",
		"billing.cancel.desc":
			"¿Estás seguro de que deseas cancelar tu suscripción? Perderás el acceso a las funciones premium al final de tu período de facturación.",
		"billing.keep": "Mantener Suscripción",
		"billing.cancel.confirm": "Cancelar Suscripción",

		// Group Settings
		"group.settings.saved": "Configuración guardada",
		"group.settings.config": "Configuración",
		"group.settings.maxchannels": "Máx de Canales por Grupo",
		"group.settings.duplicates": "Permitir Duplicados",
		"group.settings.autosort": "Ordenación Automática de Canales",
		"group.settings.categories": "Categorías",
		"group.settings.addcategory": "Añadir categoría",
		"group.settings.defaults": "Configuración Predeterminada",
		"group.settings.defaultview": "Vista Predeterminada",
		"group.settings.grid": "Cuadrícula",
		"group.settings.list": "Lista",
		"group.settings.compact": "Compacto",
		"group.settings.sortorder": "Orden de Clasificación",
		"group.settings.sort.subscribers": "Suscriptores ↓",
		"group.settings.sort.name": "Nombre A-Z",
		"group.settings.saving": "Guardando...",
		"group.settings.save": "Guardar Configuración",

		// Appearance Settings
		"appearance.theme": "Tema",
		"appearance.light": "Claro",
		"appearance.dark": "Oscuro",
		"appearance.nestfeed": "Groupify",

		// Dashboard Routes
		"dashboard.channels.title": "Todos los Canales",
		"dashboard.channels.desc": "Ver y gestionar todos los canales de YouTube",
		"dashboard.animes.title": "Todos los Animes",
		"dashboard.animes.desc": "Ver y gestionar todos los animes",
		"dashboard.websites.title": "Todos los Sitios Web",
		"dashboard.websites.desc": "Ver y gestionar todos los sitios web",

		// Share Links Page
		"sharelinks.page.title": "Enlaces Compartidos",
		"sharelinks.page.desc":
			"Gestiona y monitorea todos tus enlaces compartidos",
		"sharelinks.create": "Crear Nuevo Enlace",
		"sharelinks.select.title": "Seleccionar un Grupo",
		"sharelinks.select.desc": "Elige un grupo para crear un enlace compartido.",
		"sharelinks.nogroups": "No se encontraron grupos. Crea un grupo primero.",
		"sharelinks.channels": "{count} canales",
		"sharelinks.all": "Todos los Enlaces Compartidos",

		// Group Detail Page
		"group.detail.breadcrumb": "Inicio",
		"group.detail.channels.count": "{count} canales",
		"group.detail.tab.channels": "Canales",
		"group.detail.tab.videos": "Videos",
		"group.detail.sync.error": "Error al sincronizar videos",
		"group.detail.settings.applied": "Configuración Aplicada",
		"group.detail.settings.desc": "Tu configuración de grupo ha sido aplicada.",

		// Group Edit/Create
		"group.edit.title": "Editar Grupo",
		"group.edit.desc": "Actualizar los detalles de tu grupo de canales",
		"group.edit.submit": "Guardar Cambios",
		"group.create.title": "Crear Grupo",
		"group.create.desc": "Organiza tus canales de YouTube en grupos",
		"group.create.submit": "Crear",
		"group.edit.error": "Error",
		"group.edit.error.desc":
			"Error al actualizar el grupo. Inténtalo de nuevo.",
		"group.create.error": "Error",
		"group.create.error.desc": "Error al crear el grupo. Inténtalo de nuevo.",

		// Blog Post
		"blog.post.back": "Volver al Blog",
		"blog.post.written": "Escrito por {author}",
		"blog.post.author.desc":
			"Autor de artículos de Groupify. Apasionado por la productividad y organización en YouTube.",
	},
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>("en");

	useEffect(() => {
		const savedLanguage = localStorage.getItem("language") as Language;
		if (savedLanguage && ["en", "pt", "es"].includes(savedLanguage)) {
			setLanguage(savedLanguage);
		}
	}, []);

	const changeLanguage = (lang: Language) => {
		setLanguage(lang);
		localStorage.setItem("language", lang);
	};

	const t = (key: string, params?: Record<string, string>): string => {
		const translation =
			translations[language][
				key as keyof (typeof translations)[typeof language]
			];
		if (translation && params) {
			return Object.keys(params).reduce((acc, paramKey) => {
				const placeholder = `{${paramKey}}`;
				return acc.replace(new RegExp(placeholder, "g"), params[paramKey]);
			}, translation);
		}
		return translation || key;
	};

	return (
		<LanguageContext.Provider
			value={{ language, setLanguage: changeLanguage, t }}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
