# 🛑 CRITICAL: How to Fix "Database Connection Failed"

The error you are seeing (`Could not connect to any servers in your MongoDB Atlas cluster`) means **Vercel is blocked from accessing your database**.

You **MUST** perform these 2 steps to fix it. I cannot do this for you.

## Step 1: Whitelist Vercel IPs in MongoDB Atlas

Vercel uses dynamic IP addresses, so you must allow access from **anywhere**.

1.  Log in to your [MongoDB Atlas Dashboard](https://cloud.mongodb.com/).
2.  Click **Network Access** in the left sidebar.
3.  Click the green **+ Add IP Address** button.
4.  Click **Allow Access from Anywhere** (or enter `0.0.0.0/0`).
5.  Click **Confirm**.
6.  _Wait 1-2 minutes for the changes to deploy._

## Step 2: Add Environment Variables in Vercel

Your local `.env` file is NOT uploaded to Vercel. You must set the variables in the Vercel dashboard.

1.  Go to your **Vercel Project Dashboard**.
2.  Click **Settings** (top tab) -> **Environment Variables** (left sidebar).
3.  Add the following variable:
    - **Key**: `MONGO_URI`
    - **Value**: `mongodb+srv://portfolio:sC9S5kfRo68cfPve@cluster0.txsavd8.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0`
4.  **Important**: You **MUST REDEPLOY** for these changes to take effect.
    - Run `vercel --prod` in your terminal again.

---

### Verification

If you have done these steps correctly, the error will disappear and your data will load.
