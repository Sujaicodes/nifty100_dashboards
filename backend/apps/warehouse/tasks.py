from celery import shared_task


@shared_task
def refresh_demo_scores() -> str:
    return "Demo refresh task placeholder for ETL and ML score recomputation."

