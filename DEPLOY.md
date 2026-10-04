# Deployment Guide

Deploy this high-performance static website to production in under 5 minutes.

## Prerequisites
- A GitHub Account
- A free [Render.com](https://render.com) Account

---

## Local Development & Validation (Optional)
Run the application locally using Docker to test configurations:

```bash
# 1. Build and start the container
docker-compose up -d --build

# 2. View running application at
# http://localhost:8080
```

---

## 3-Step Production Deploy

### Step 1: Create a Render Blueprint
1. Push this repository to your GitHub account.
2. Log in to the [Render Dashboard](https://dashboard.render.com).
3. Click **New** (top right) and select **Blueprint**.
4. Connect your GitHub repository. Render will automatically detect the `render.yaml` blueprint.
5. Click **Approve** to create and build the Web Service using the custom Docker configuration.

### Step 2: Set up Automatic CD (Optional)
To trigger automated builds every time you push to your main branch:
1. Go to your **Web Service** dashboard on Render.
2. Copy the **Deploy Hook** URL found under your service's **Settings**.
3. Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
4. Add a secret named `RENDER_DEPLOY_HOOK_URL` and paste your Deploy Hook URL as the value.

### Step 3: Test Public URL
1. Wait for the deploy to complete (usually < 2 minutes).
2. Open the generated `*.onrender.com` URL provided in your Render dashboard to view your live, secure static site!