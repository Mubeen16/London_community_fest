# Backend Architecture — Community Event OS

Complete backend architecture for **Community Event OS** — multi-tenant ready, shipping single-tenant first (South Indian Community UK → London Community Fest 2026).

**Status:** Planned (API not in this repo yet)  
**Frontend:** This Next.js site on Vercel  
**Backend (planned):** `community_fest_api` on Railway

---

## System overview

```
┌──────────────────────────────────────────────────────────────┐
│                        CLIENTS                                │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│  Next.js     │  Mobile      │  Check-in    │  Django         │
│  Website     │  (future)    │  Scanner     │  Admin          │
│  (Vercel)    │              │  (phone)     │  (built-in)     │
└──────┬───────┴──────┬───────┴──────┬───────┴────────┬────────┘
       │              │              │                │
       ▼              ▼              ▼                ▼
┌──────────────────────────────────────────────────────────────┐
│                    DJANGO REST API                            │
│                    /api/v1/                                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────────┐  │
│  │  CORE   │  │ TICKETS  │  │WAITLIST │  │   VENDORS    │  │
│  │         │  │          │  │         │  │              │  │
│  │ Org     │  │ Types    │  │ Email   │  │ Application  │  │
│  │ Event   │  │ Orders   │  │ Confirm │  │ Status flow  │  │
│  │ Members │  │ Tickets  │  │         │  │              │  │
│  │         │  │ Stripe   │  │         │  │              │  │
│  │         │  │ QR codes │  │         │  │              │  │
│  └─────────┘  └──────────┘  └─────────┘  └──────────────┘  │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────────┐  │
│  │ SPONSORS │  │ CHECKIN  │  │         COMMON            │  │
│  │          │  │          │  │                           │  │
│  │ Leads    │  │ Scan     │  │ Permissions              │  │
│  │ Status   │  │ Verify   │  │ Pagination               │  │
│  │ Tracking │  │ Stats    │  │ Exception handling        │  │
│  │          │  │ Gate     │  │ EventScopedMixin          │  │
│  └──────────┘  └──────────┘  └───────────────────────────┘  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                    SERVICES LAYER                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Stripe  │  │    QR    │  │  Email   │  │  Storage   │  │
│  │ Checkout │  │ Generate │  │  Send    │  │  (future)  │  │
│  │ Webhooks │  │ Verify   │  │  Template│  │            │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    POSTGRESQL (Railway)                        │
└──────────────────────────────────────────────────────────────┘
```

---

## Project structure

```
community_fest_api/
│
├── config/                      # Project configuration
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py             # Shared settings (installed apps, middleware, etc.)
│   │   ├── development.py      # DEBUG=True, local DB, CORS allow all
│   │   └── production.py       # DEBUG=False, Railway DB, restricted CORS
│   ├── urls.py                 # Root URL conf — includes all app URLs
│   └── wsgi.py
│
├── apps/
│   ├── __init__.py
│   │
│   ├── core/                   # Organisation + Event — the multi-tenant foundation
│   │   ├── __init__.py
│   │   ├── models.py           # Organisation, Event, OrganisationMembership
│   │   ├── serializers.py      # EventDetailSerializer, EventListSerializer
│   │   ├── views.py            # EventRetrieveView (public)
│   │   ├── admin.py            # Register models for Django admin
│   │   ├── urls.py
│   │   └── migrations/
│   │
│   ├── waitlist/               # Email capture — first feature
│   │   ├── __init__.py
│   │   ├── models.py           # WaitlistEntry (event, email, confirmed)
│   │   ├── serializers.py      # WaitlistSerializer (email validation)
│   │   ├── views.py            # WaitlistCreateView
│   │   ├── services.py         # send_confirmation_email()
│   │   ├── admin.py
│   │   ├── urls.py
│   │   └── migrations/
│   │
│   ├── tickets/                # Orders + payment + QR — the big feature
│   │   ├── __init__.py
│   │   ├── models.py           # TicketType, Order, Ticket
│   │   ├── serializers.py      # CheckoutSerializer, OrderDetailSerializer
│   │   ├── views.py            # TicketTypesView, CheckoutView, WebhookView
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── stripe.py       # create_checkout_session(), handle_webhook()
│   │   │   ├── qr.py           # generate_token(), generate_qr_image()
│   │   │   └── email.py        # send_ticket_confirmation()
│   │   ├── admin.py
│   │   ├── urls.py
│   │   └── migrations/
│   │
│   ├── vendors/                # Stall applications
│   │   ├── __init__.py
│   │   ├── models.py           # VendorApplication
│   │   ├── serializers.py      # VendorApplicationSerializer
│   │   ├── views.py            # VendorApplicationCreateView
│   │   ├── admin.py
│   │   ├── urls.py
│   │   └── migrations/
│   │
│   ├── sponsors/               # Sponsor enquiries
│   │   ├── __init__.py
│   │   ├── models.py           # SponsorLead
│   │   ├── serializers.py      # SponsorLeadSerializer
│   │   ├── views.py            # SponsorLeadCreateView
│   │   ├── admin.py
│   │   ├── urls.py
│   │   └── migrations/
│   │
│   └── checkin/                # Event-day operations
│       ├── __init__.py
│       ├── models.py           # CheckIn
│       ├── serializers.py      # CheckInSerializer, StatsSerializer
│       ├── views.py            # CheckInView, StatsView
│       ├── admin.py
│       ├── urls.py
│       └── migrations/
│
├── common/                     # Shared code across all apps
│   ├── __init__.py
│   ├── mixins.py               # EventScopedMixin — the key pattern
│   ├── permissions.py          # IsPublic, IsGateVolunteer, IsOrganisationMember
│   ├── pagination.py           # StandardPagination
│   └── exceptions.py           # Custom DRF exception handler
│
├── requirements/
│   ├── base.txt                # Django, DRF, shared deps
│   ├── dev.txt                 # Debug toolbar, etc.
│   └── prod.txt                # Gunicorn, whitenoise, etc.
│
├── .env.example                # Template for environment variables
├── .gitignore
├── Dockerfile                  # For Railway deployment
├── manage.py
└── README.md
```

---

## EventScopedMixin

The single most important pattern. Every view that touches event-scoped data inherits from this:

```python
# common/mixins.py

from django.shortcuts import get_object_or_404
from apps.core.models import Event


class EventScopedMixin:
    """
    Every view that operates within an event context.

    Extracts event from URL slug, filters querysets,
    and auto-assigns event on create.

    URL pattern: /api/v1/events/{event_slug}/...
    """

    def get_event(self):
        if not hasattr(self, "_event"):
            self._event = get_object_or_404(
                Event,
                slug=self.kwargs["event_slug"],
                status="published",
            )
        return self._event

    def get_queryset(self):
        return super().get_queryset().filter(event=self.get_event())

    def perform_create(self, serializer):
        serializer.save(event=self.get_event())
```

**Why this matters:** Without it, every view would manually look up the event, filter querysets, and assign the event on create. Developers would forget. Data would leak between events. This mixin makes it impossible to accidentally return tickets from the wrong event.

---

## URL routing

```python
# config/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/events/<slug:event_slug>/", include([
        path("", include("apps.core.urls")),
        path("waitlist/", include("apps.waitlist.urls")),
        path("tickets/", include("apps.tickets.urls")),
        path("vendors/", include("apps.vendors.urls")),
        path("sponsors/", include("apps.sponsors.urls")),
        path("checkin/", include("apps.checkin.urls")),
    ])),
]
```

Every endpoint starts with `/api/v1/events/{event_slug}/`. The event slug scopes everything. When a second event exists, it automatically gets its own namespace.

**London Community Fest 2026 example slug:** `london-community-fest-2026`

---

## Complete API endpoints

```
PUBLIC (no auth):
GET    /api/v1/events/{slug}/                    → Event details
POST   /api/v1/events/{slug}/waitlist/           → Join waitlist
GET    /api/v1/events/{slug}/tickets/            → Available ticket types
POST   /api/v1/events/{slug}/tickets/checkout/   → Start Stripe payment
POST   /api/v1/events/{slug}/tickets/webhook/    → Stripe confirms payment
POST   /api/v1/events/{slug}/vendors/            → Submit vendor application
POST   /api/v1/events/{slug}/sponsors/           → Submit sponsor enquiry

GATE AUTH (token):
POST   /api/v1/events/{slug}/checkin/{token}/    → Check in a ticket
GET    /api/v1/events/{slug}/checkin/stats/      → Live attendance

ADMIN (session/JWT — future):
GET    /api/v1/events/{slug}/orders/             → All orders
GET    /api/v1/events/{slug}/vendors/            → All applications
PATCH  /api/v1/events/{slug}/vendors/{id}/       → Approve/reject
GET    /api/v1/events/{slug}/sponsors/           → All leads
GET    /api/v1/events/{slug}/dashboard/          → Event stats
```

### Frontend integration (this repo)

| Site feature | Endpoint | Current state |
|--------------|----------|---------------|
| Plan your visit / waitlist | `POST …/waitlist/` | Config / mailto |
| Get tickets | `POST …/tickets/checkout/` | `registrationOpen: false` |
| Vendor CTA | `POST …/vendors/` | mailto |
| Sponsor CTA | `POST …/sponsors/` | mailto |
| Event-day check-in | `POST …/checkin/{token}/` | Not built |

Planned env var: `NEXT_PUBLIC_API_URL`

---

## Database relationships

```
Organisation (South Indian Community UK)
    │
    ├── OrganisationMembership → User (committee members)
    │
    └── Event (London Community Fest 2026)
         │
         ├── TicketType (Adult £3, Child Free)
         │   └── Ticket → Order → Stripe
         │
         ├── WaitlistEntry (emails)
         │
         ├── VendorApplication (status workflow)
         │
         ├── SponsorLead (status workflow)
         │
         ├── GateToken (check-in auth)
         │
         └── CheckIn → Ticket (event-day scans)
```

### Core schema (reference)

| Model | Key fields |
|-------|------------|
| **Organisation** | `id`, `name`, `slug`, `email`, `phone`, `logo`, `website`, `created_at` |
| **Event** | `organisation_id`, `name`, `slug`, `description`, `date`, `start_time`, `end_time`, `venue_name`, `venue_address`, `postcode`, `status` (`draft` / `published` / `completed`) |
| **OrganisationMembership** | Links users to orgs (admin later) |
| **TicketType** | `event_id`, `name`, `price`, `description`, `quantity_available`, `quantity_sold`, `is_free` |
| **Order** | `event_id`, `email`, `name`, `phone`, `stripe_session_id`, `stripe_payment_id`, `status`, `total_amount` |
| **Ticket** | `order_id`, `ticket_type_id`, `qr_code`, `attendee_name`, `checked_in`, `checked_in_at` |
| **WaitlistEntry** | `event_id`, `email` (unique per event), `confirmed` |
| **VendorApplication** | `event_id`, `business_name`, `contact_name`, `email`, `phone`, `stall_type`, `description`, `status` |
| **SponsorLead** | `event_id`, `company_name`, `contact_name`, `email`, `phone`, `tier_interest`, `message`, `status` |
| **CheckIn** | `ticket_id`, `gate`, `scanned_by`, `timestamp` |
| **GateToken** | Check-in scanner authentication |

---

## Settings architecture

Three settings modules — shared base, local dev, production:

```python
# config/settings/base.py — shared across all environments
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third party
    "rest_framework",
    "corsheaders",
    # Our apps
    "apps.core",
    "apps.waitlist",
    "apps.tickets",
    "apps.vendors",
    "apps.sponsors",
    "apps.checkin",
]

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "common.pagination.StandardPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "EXCEPTION_HANDLER": "common.exceptions.custom_exception_handler",
}

# config/settings/development.py — your laptop
DEBUG = True
DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", ...}}
CORS_ALLOW_ALL_ORIGINS = True

# config/settings/production.py — Railway
DEBUG = False
DATABASES = {"default": dj_database_url.config(conn_max_age=600)}
CORS_ALLOWED_ORIGINS = ["https://london-community-fest.vercel.app"]
```

**SQLite for dev, PostgreSQL for prod:** SQLite needs zero setup locally — you start coding immediately. Railway provides PostgreSQL. The Django ORM abstracts the difference. Models, queries, and migrations work identically on both. Test on SQLite locally; deploy to PostgreSQL on Railway.

---

## Services layer

```
View (handles HTTP) → Service (handles logic) → Model (handles data)
```

Views should be thin — receive request, validate, call service, return response. Business logic lives in services:

- Test Stripe logic without HTTP
- Reuse email sending across views
- Keep views under ~30 lines each
- Changing payment provider only touches `services/stripe.py`

| Service | Responsibility |
|---------|----------------|
| `tickets/services/stripe.py` | Checkout sessions, webhooks |
| `tickets/services/qr.py` | Token generation, QR PNG |
| `tickets/services/email.py` | Ticket confirmation emails |
| `waitlist/services.py` | Waitlist confirmation email |

---

## Tech decisions (locked)

| Decision | Choice | Why |
|----------|--------|-----|
| Database | PostgreSQL on Railway | Production-grade; JSON fields for flexibility |
| Payments | Stripe Checkout | Hosted page; PCI compliant; no card data on our servers |
| QR codes | `qrcode` (Python) | Simple; offline-capable; PNG output |
| Emails | Django + SendGrid or Resend | Transactional confirmations |
| Auth (later) | Django auth + JWT | Public APIs first; admin dashboard later |
| API versioning | `/api/v1/` URL prefix | Future-proof |
| CORS | `django-cors-headers` | Vercel frontend ↔ Railway backend |

---

## What NOT to build now

- User authentication for public visitors
- Custom admin dashboard (use Django admin)
- Real-time WebSockets (polling for check-in stats)
- Multi-organisation self-service signup (create orgs manually)
- Payment plans or invoicing (Stripe one-time only)

---

## Build schedule

```
Week 1 (now):
├── config/ (settings, urls)
├── apps/core/ (Organisation, Event)
├── apps/waitlist/ (first endpoint)
├── common/ (mixin, permissions, pagination)
└── Deploy to Railway

Week 2:
├── apps/vendors/ (application form)
├── apps/sponsors/ (enquiry form)
└── Connect frontend forms

Week 3:
├── apps/tickets/ models
├── apps/tickets/services/stripe.py
├── apps/tickets/services/qr.py
└── Stripe checkout flow

Week 4:
├── apps/tickets/services/email.py
├── Webhook handling
└── Confirmation emails with QR

Week 5:
├── apps/checkin/
├── GateToken auth
└── Check-in scanner page

Week 6:
├── Testing
├── Edge cases
└── Load testing for 4,000 attendees
```

**Event day:** 12 July 2026 — check-in system live.

---

## Next step

**Week 1:** Django project initialisation with the `config/` structure above, core models, and waitlist API — first live endpoint: `POST /api/v1/events/london-community-fest-2026/waitlist/`.
