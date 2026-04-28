import logging
import time
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("cicd-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="Cloud-Native CI/CD API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/pipelines")
def get_pipelines():
    return [
        {"id": 1, "name": "frontend-build", "status": "success", "last_run": "2026-04-28T10:00:00Z"},
        {"id": 2, "name": "backend-api-deploy", "status": "running", "last_run": "2026-04-28T11:15:00Z"},
        {"id": 3, "name": "infra-terraform-sync", "status": "failed", "last_run": "2026-04-28T09:30:00Z"}
    ]

@app.get("/releases")
def get_releases():
    return [
        {"id": "rel-123", "app": "payment-svc", "version": "v1.4.2", "env": "Production", "status": "Healthy"},
        {"id": "rel-124", "app": "auth-svc", "version": "v2.1.0-canary", "env": "Staging", "status": "Progressing"}
    ]

@app.get("/metrics/dora")
def get_dora_metrics():
    return {
        "deployment_frequency": "Daily",
        "lead_time_for_changes": "4.2 hours",
        "change_failure_rate": "2.5%",
        "mttr": "45 minutes"
    }

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "active_pipelines": 12,
        "failed_today": 1,
        "total_releases_24h": 45,
        "cluster_health": "Optimal"
    }
