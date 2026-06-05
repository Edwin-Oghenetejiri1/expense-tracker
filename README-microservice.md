# Expense Tracker — MERN Stack

A full-stack expense tracking application built with MongoDB, Express, React, and Node.js. Deployed on AWS EKS with a complete GitOps CI/CD pipeline.

**Live:** https://app.retrogameshop.online

---

## Application Overview

Track your income and expenses with a clean dashboard showing:
- Balance summary (total income, expenses, net balance)
- Transaction history with category and date
- Visual charts for spending breakdown
- Add and delete transactions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Recharts, Axios, React Router |
| Backend | Node.js, Express 5, Mongoose |
| Database | MongoDB 7.0 |
| Container | Docker, nginx (frontend), node (backend) |
| CI/CD | GitHub Actions |
| Registry | DockerHub |

---

## Repository Structure

```
expense-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTransaction.js   # Add income/expense form
│   │   │   ├── TransactionList.js  # Transaction history
│   │   │   ├── SummaryCards.js     # Balance, income, expense cards
│   │   │   ├── Chart.js            # Spending chart
│   │   │   └── Navbar.js           # Navigation
│   │   └── pages/
│   │       └── Dashboard.js        # Main dashboard page
│   ├── Dockerfile                  # Multi-stage nginx build
│   └── nginx.conf                  # nginx config with React Router support
├── backend/
│   ├── controllers/
│   │   └── transactionController.js
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   └── transactionRoutes.js
│   ├── server.js
│   └── Dockerfile
└── docker-compose.yaml             # Local development
```

---

## Running Locally

```bash
git clone https://github.com/Edwin-Oghenetejiri1/expense-tracker.git
cd expense-tracker

# create frontend .env
echo "REACT_APP_API_URL=http://localhost:5000" > frontend/.env

# start all services
docker compose up -d
```

Then open `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/transactions` | Get all transactions with summary |
| `POST` | `/api/transactions` | Create a new transaction |
| `DELETE` | `/api/transactions/:id` | Delete a transaction |
| `GET` | `/health` | Health check |

---

## CI/CD Pipeline

Two separate GitHub Actions pipelines:

### Frontend CI (triggers on `frontend/**` changes)
```
Push to main
    ↓
Build & test (Node.js 24)
    ↓
ESLint code quality check
    ↓
Docker build + push to DockerHub
    ↓
Open PR on k8s-manifests repo with new image tag
    ↓
Merge PR → ArgoCD redeploys
```

### Backend CI (triggers on `backend/**` changes)
```
Push to main
    ↓
Build & test (Node.js 24)
    ↓
ESLint code quality check
    ↓
Docker build + push to DockerHub
    ↓
Open PR on k8s-manifests repo with new image tag
    ↓
Merge PR → ArgoCD redeploys
```

---

## Docker Images

| Image | DockerHub |
|---|---|
| Frontend | `oghenetejiri798/expense-tracker-frontend:latest` |
| Backend | `oghenetejiri798/expense-tracker-backend:latest` |

---

## GitHub Secrets Required

| Secret | Description |
|---|---|
| `DOCKER_USERNAME` | DockerHub username |
| `DOCKER_TOKEN` | DockerHub access token |
| `GH_PAT` | GitHub PAT with repo scope (for manifests PR) |

---

## Environment Variables

### Backend
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Server port (default: 5000) |

### Frontend
| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Backend API URL (empty in production — ALB handles routing) |

---

## Related Repositories

- [expense-tracker-k8s-manifests](https://github.com/Edwin-Oghenetejiri1/expense-tracker-k8s-manifests) — Kubernetes manifests
- [expense-tracker-eks-infra](https://github.com/Edwin-Oghenetejiri1/expense-tracker-eks-infra) — EKS infrastructure

---

## Author

**Edwin Oghenetejiri Ayomide**  
DevOps & Cloud Engineer  
[github.com/Edwin-Oghenetejiri1](https://github.com/Edwin-Oghenetejiri1) | [retrogameshop.online](https://retrogameshop.online)
