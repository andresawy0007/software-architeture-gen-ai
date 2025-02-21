from diagrams import Diagram, Cluster, Edge
from diagrams.aws.mobile import APIGateway
from diagrams.aws.compute import Lambda
from diagrams.aws.network import APIGateway as APIGW
from diagrams.aws.integration import SimpleQueueServiceSqs
from diagrams.aws.ml import Comprehend, Transcribe
from diagrams.aws.database import Dynamodb
from diagrams.aws.security import WAF
from diagrams.aws.integration import StepFunctions
from diagrams.aws.storage import S3
from diagrams.aws.analytics import KinesisDataStreams
from diagrams.custom import Custom
from diagrams.programming.framework import Flask

# Crear el diagrama
with Diagram("WhatsApp Flight Change Architecture", show=True, direction="LR"):
    # External Services
    whatsapp = Custom("WhatsApp\nBusiness API", "./whatsapp_logo.png")
    
    with Cluster("Security Layer"):
        waf = WAF("WAF")
        api_gateway = APIGW("API Gateway")

    # Message Processing
    with Cluster("Message Processing"):
        message_queue = SimpleQueueServiceSqs("Message Queue")
        voice_bucket = S3("Voice Messages")
        transcribe = Transcribe("Voice to Text")
        
    # NLP Processing
    with Cluster("Natural Language Processing"):
        comprehend = Comprehend("Intent Detection")
        langgraph = Custom("LangGraph", "./langchain_logo.png")
        
    # Business Logic
    with Cluster("Business Logic"):
        step_functions = StepFunctions("Orchestration")
        
        with Cluster("Microservices"):
            retrieve_lambda = Lambda("Retrieve Reservation")
            fare_lambda = Lambda("Fare Reshop")
            payment_lambda = Lambda("Process Payment")
    
    # Data Layer
    with Cluster("Data Layer"):
        reservations_db = Dynamodb("Reservations")
        session_db = Dynamodb("Session State")

    # Flow
    whatsapp >> waf >> api_gateway >> message_queue
    message_queue >> voice_bucket >> transcribe >> comprehend
    message_queue >> comprehend
    
    comprehend >> langgraph >> step_functions
    
    step_functions >> retrieve_lambda >> reservations_db
    step_functions >> fare_lambda
    step_functions >> payment_lambda
    
    session_db << Edge(color="darkgreen") << step_functions
    
    whatsapp << Edge(color="blue") << step_functions 