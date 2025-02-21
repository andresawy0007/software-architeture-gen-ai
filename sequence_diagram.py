from diagrams import Diagram, Edge, Node
from diagrams.custom import Custom

# Crear el diagrama de secuencia
with Diagram("WhatsApp Flight Change Sequence", show=True, direction="TB"):
    # Actores y Sistemas
    user = Custom("Usuario", "./whatsapp_logo.png")
    whatsapp = Node("WhatsApp API")
    nlp = Node("NLP Processing")
    langgraph = Custom("LangGraph", "./langchain_logo.png")
    reservation = Node("Retrieve\nReservation")
    fare = Node("Fare Reshop")
    payment = Node("Payment")
    
    # Flujo principal
    user >> Edge(label="1. Envía mensaje\n(texto/voz)") >> whatsapp
    
    # Procesamiento inicial
    whatsapp >> Edge(label="2. Procesa mensaje") >> nlp
    nlp >> Edge(label="3. Detecta intención") >> langgraph
    
    # Flujo de reserva
    langgraph >> Edge(label="4. Solicita info\nde reserva") >> reservation
    reservation >> Edge(label="5. Devuelve detalles\nde reserva") >> langgraph
    
    # Flujo de cambio
    langgraph >> Edge(label="6. Solicita opciones\nde cambio") >> fare
    fare >> Edge(label="7. Devuelve opciones\ny costos") >> langgraph
    
    # Respuesta al usuario
    langgraph >> Edge(label="8. Presenta opciones") >> whatsapp
    whatsapp >> Edge(label="9. Muestra opciones") >> user
    
    # Confirmación y pago
    user >> Edge(label="10. Selecciona opción") >> whatsapp
    whatsapp >> Edge(label="11. Procesa selección") >> langgraph
    langgraph >> Edge(label="12. Inicia pago") >> payment
    payment >> Edge(label="13. Confirma pago") >> langgraph
    
    # Confirmación final
    langgraph >> Edge(label="14. Confirma cambio") >> whatsapp
    whatsapp >> Edge(label="15. Envía confirmación") >> user 