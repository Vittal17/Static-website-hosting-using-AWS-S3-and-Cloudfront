# 🌐 Static Website Hosting on AWS S3 + CloudFront

A production-ready static website deployed on Amazon Web Services using S3 for storage and CloudFront CDN for global content delivery.

## 🎯 Overview

This project demonstrates how to deploy a static website using AWS's serverless infrastructure. The website is stored in an S3 bucket and distributed globally through CloudFront's CDN network, ensuring fast loading times and high availability for users worldwide.

**Live Demo**: `https://d36oiudavj64kh.cloudfront.net`

## 🏗️ Architecture

```
┌─────────────┐
│   Internet  │
│    Users    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│      Amazon CloudFront          │
│   (400+ Edge Locations)         │
│   - Global CDN                  │
│   - HTTPS Encryption            │
│   - Content Caching (24h TTL)   │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│      Amazon S3 Bucket           │
│   (Origin Server)               │
│   - Static Website Hosting      │
│   - Stores HTML/CSS/JS          │
│   - 99.9% Availability          │
└─────────────────────────────────┘
```

### Architecture Flow

1. **User Request**: User visits CloudFront URL
2. **Edge Location Check**: CloudFront checks if content is cached at nearest edge location
3. **Cache Hit/Miss**:
   - **Hit**: Serve from edge (< 50ms latency)
   - **Miss**: Fetch from S3 origin, cache it, then serve
4. **Content Delivery**: HTTPS-encrypted content delivered to user

## ✨ Features

- ✅ **Global Content Delivery**: 400+ edge locations worldwide
- 🔒 **Secure HTTPS**: Automatic SSL/TLS encryption
- ⚡ **High Performance**: < 50ms latency globally
- 📈 **Auto-Scaling**: Handles millions of concurrent users
- 💰 **Cost-Effective**: ~$2/month operational cost
- 🛡️ **High Availability**: 99.9% uptime SLA
- 🚀 **Fast Deployment**: Website live in < 15 minutes
- 🔄 **Easy Updates**: Simple file upload + cache invalidation

## 🛠️ Technologies Used

### AWS Services
- **Amazon S3**: Object storage for website files
- **Amazon CloudFront**: Content Delivery Network (CDN)
- **Static Website Hosting**: S3 feature to serve web content

### Frontend
- **HTML5**: Website structure
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Interactive features and animations

## 📋 Prerequisites

Before starting, ensure you have:

- AWS Account (Free Tier eligible)
- Basic understanding of HTML/CSS/JavaScript
- AWS Console access
- Text editor (VS Code, Sublime Text, etc.)

## 🚀 Deployment Guide

### Step 1: Create Website Files

Create three files in a local directory:

**cc.html** - Main webpage
**cc.css** - Styling
**cc.js** - Interactive features

### Step 2: Set Up S3 Bucket

1. **Navigate to S3**:
   - Login to AWS Console
   - Search for "S3" and click

2. **Create Bucket**:
   ```
   Bucket name: my-website-project-2025 (must be globally unique)
   Region: US East (N. Virginia) or your preferred region
   Block Public Access: UNCHECK (allow public access)
   ```

3. **Upload Files**:
   - Click "Upload"
   - Add `cc.html`, `cc.css`, `cc.js`
   - Click "Upload"

4. **Enable Static Website Hosting**:
   - Go to Properties tab
   - Scroll to "Static website hosting"
   - Enable it
   - Index document: `cc.html`
   - Save changes

5. **Set Bucket Policy**:
   - Go to Permissions tab
   - Bucket Policy → Edit
   - Add this policy (replace `YOUR-BUCKET-NAME`):

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "PublicReadGetObject",
               "Effect": "Allow",
               "Principal": "*",
               "Action": "s3:GetObject",
               "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
           }
       ]
   }
   ```

### Step 3: Create CloudFront Distribution

1. **Navigate to CloudFront**:
   - Search for "CloudFront" in AWS Console

2. **Create Distribution**:
   ```
   Origin domain: Select your S3 bucket
   Origin path: Leave blank
   Viewer protocol policy: Redirect HTTP to HTTPS
   Allowed HTTP methods: GET, HEAD
   Cache policy: CachingOptimized
   Price class: Use all edge locations
   Default root object: index.html
   WAF: Do not enable (to save costs)
   ```

3. **Click "Use website endpoint"** when prompted (yellow banner)

4. **Create Distribution** and wait 10-15 minutes for deployment

### Step 4: Configure Default Root Object

1. After deployment, click on distribution
2. Go to Settings → Edit
3. Set **Default root object**: `cc.html`
4. Save changes

### Step 5: Test Your Website

**CloudFront URL**: `https://[DISTRIBUTION-ID].cloudfront.net`

**S3 Website URL**: `http://[BUCKET-NAME].s3-website-[REGION].amazonaws.com`

Both should display your website!

## 📁 Project Structure

```
aws-static-website/
│
├── cc.html          # Main HTML file
├── cc.css           # Stylesheet
├── cc.js           # JavaScript interactivity
└── README.md           # Project documentation
```

## ⚙️ How It Works

### Content Delivery Process

1. **Initial Request**:
   - User in Tokyo visits: `https://d36oiudavj64kh.cloudfront.net`
   - DNS routes to nearest CloudFront edge (Tokyo)

2. **Cache Check**:
   - CloudFront checks: "Do I have this file cached?"
   - First visit: **No** → Fetch from S3 in Virginia
   - Subsequent visits: **Yes** → Serve from Tokyo edge

3. **Caching**:
   - Files cached for 24 hours (TTL)
   - Next user in Tokyo gets instant response (< 10ms)

4. **Origin Requests**:
   - Only happens on cache miss
   - CloudFront fetches from S3
   - Caches for future requests

### Why This is Fast

| Without CloudFront | With CloudFront |
|-------------------|-----------------|
| Every request goes to Virginia | Served from nearest edge |
| Tokyo → Virginia: 200ms latency | Tokyo → Tokyo: 10ms latency |
| S3 charged for every request | S3 charged only on cache miss |

## 🔄 Updating the Website

When you need to make changes:

### Quick Update Process

```bash
# 1. Edit files locally
# 2. Upload to S3
AWS Console → S3 → Your Bucket → Upload → Select files → Upload

# 3. Invalidate CloudFront Cache
AWS Console → CloudFront → Your Distribution → Invalidations
→ Create Invalidation → Enter: /* → Create

# 4. Wait 1-2 minutes → Changes are live!
```

### Why Invalidate?

CloudFront caches files for 24 hours. Without invalidation:
- Users see old content until cache expires
- Updates take 24 hours to propagate

With invalidation:
- Forces CloudFront to fetch fresh files from S3
- Updates live in 1-2 minutes
- First 1,000 invalidations/month are FREE

## 💵 Cost Analysis

### Monthly Cost Breakdown (10,000 visitors)

| Service | Usage | Cost |
|---------|-------|------|
| **S3 Storage** | 100MB | $0.002 |
| **S3 GET Requests** | 30,000 | $0.012 |
| **CloudFront Data Transfer** | 20GB | $1.70 |
| **CloudFront Requests** | 30,000 | $0.02 |
| **Total** | - | **~$1.75/month** |

### Free Tier Benefits (First 12 Months)

- **S3**: 5GB storage + 20,000 GET requests
- **CloudFront**: 1TB data transfer + 10M HTTP/HTTPS requests
- **Actual Cost**: ~$0.50/month or less!

### Cost Comparison

| Hosting Type | Monthly Cost | Setup Time |
|-------------|-------------|------------|
| **AWS S3 + CloudFront** | $2 | 1 hour |
| Shared Hosting | $5-10 | 30 mins |
| VPS (DigitalOcean) | $20-50 | 2-4 hours |
| Dedicated Server | $100+ | 1 day+ |

## 📊 Performance Metrics

### Speed Tests

- **Global Average Latency**: < 50ms
- **Time to First Byte (TTFB)**: 10-30ms
- **Page Load Time**: < 1 second
- **Lighthouse Score**: 95+ (Performance)

### Scalability

- **Concurrent Users**: Unlimited (auto-scales)
- **Bandwidth**: Unlimited
- **Uptime SLA**: 99.9%
- **Edge Locations**: 400+

### Regional Performance

| Region | Latency | Edge Location |
|--------|---------|---------------|
| Asia (India) | 15ms | Mumbai |
| Europe (UK) | 12ms | London |
| Americas (US) | 10ms | N. Virginia |
| Asia (Japan) | 18ms | Tokyo |

## 🐛 Troubleshooting

### Issue 1: "NoSuchKey" Error

**Symptom**: 404 error when visiting CloudFront URL

**Solution**:
```
1. Verify default root object = cc.html
2. Check cc.html is in S3 root (not in a folder)
3. File names are case-sensitive
```

### Issue 2: Website Not Updating

**Symptom**: Changes not visible after upload

**Solution**:
```
1. Upload files to S3✓
2. Create CloudFront invalidation: /*
3. Clear browser cache: Ctrl + Shift + R
4. Wait 2-3 minutes
```

### Issue 3: "403 Forbidden" Error

**Symptom**: Access denied when visiting website

**Solution**:
```
1. Check bucket policy allows public read
2. Verify "Block Public Access" is OFF
3. Confirm files are uploaded successfully
```

### Issue 4: CSS/JS Not Loading

**Symptom**: Unstyled webpage, no interactivity

**Solution**:
```
1. Verify cc.css and cc.js are uploaded
2. Check file names match exactly (case-sensitive)
3. Create CloudFront invalidation
4. Check browser console for errors (F12)
```

## 🚀 Future Enhancements

### Potential Improvements

- [ ] **Custom Domain**: Add `www.yourname.com` via Route 53
- [ ] **SSL Certificate**: Free certificate via AWS Certificate Manager
- [ ] **CI/CD Pipeline**: Automated deployment with GitHub Actions
- [ ] **Version Control**: Enable S3 versioning for rollbacks
- [ ] **Analytics**: CloudFront logging + Amazon Athena analysis
- [ ] **Error Pages**: Custom 404 error page
- [ ] **Compression**: Enable Gzip/Brotli in CloudFront
- [ ] **Image Optimization**: Use CloudFront image processing
- [ ] **Security Headers**: Add CSP, HSTS headers
- [ ] **Monitoring**: CloudWatch alarms for errors/latency

### Advanced Features

- WAF rules for additional security
- Lambda@Edge for dynamic content
- Multi-region failover setup
- Blue-green deployment strategy

## 📚 Learning Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Static Website Hosting Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


## 🙏 Acknowledgments

- AWS Free Tier for hosting
- AWS Documentation for comprehensive guides
- CloudFront team for global CDN infrastructure

---

⭐ **Star this repository** if you found it helpful!

📧 **Questions?** Open an issue or reach out!

🔗 **Live Demo**: [https://d36oiudavj64kh.cloudfront.net](https://d36oiudavj64kh.cloudfront.net)

---

**Built with ❤️ using AWS Cloud Services**
