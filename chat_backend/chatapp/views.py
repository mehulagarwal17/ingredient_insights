from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import ChatSession, Message
from .serializers import ChatSessionSerializer, ChatSessionListSerializer, MessageSerializer

class ChatSessionViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSessionSerializer
    permission_classes = []  # Remove authentication requirement temporarily
    
    def get_queryset(self):
        return ChatSession.objects.all()  # Get all sessions when no auth
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ChatSessionListSerializer
        return ChatSessionSerializer
    
    def perform_create(self, serializer):
        # Auto-generate title from first message if not provided
        title = serializer.validated_data.get('title', 'New Chat')
        serializer.save(user=None, title=title)  # No user when auth disabled
    
    @action(detail=True, methods=['post'])
    def messages(self, request, pk=None):
        """Add a new message to the session"""
        session = self.get_object()
        role = request.data.get('role')
        content = request.data.get('content')
        
        if not role or not content:
            return Response(
                {'error': 'Both role and content are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        message = Message.objects.create(
            session=session,
            role=role,
            content=content
        )
        
        # Update session timestamp
        session.updated_at = timezone.now()
        session.save()
        
        # Auto-generate title from first user message if title is still "New Chat"
        if session.title == 'New Chat' and role == 'user' and session.messages.filter(role='user').count() == 1:
            session.title = content[:50] + '...' if len(content) > 50 else content
            session.save()
        
        serializer = MessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def messages_list(self, request, pk=None):
        """Get all messages for a session"""
        session = self.get_object()
        messages = session.messages.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
