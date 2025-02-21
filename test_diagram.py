from diagrams import Diagram
from diagrams.aws.compute import Lambda
from diagrams.aws.database import RDS

with Diagram("Simple AWS Architecture", show=True):
    Lambda("AWS Lambda") >> RDS("RDS Database") 