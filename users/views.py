from django.contrib.auth.models import User
from rest_framework import authentication, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser

from .models import CustomUser, Entry
from .serializers import UserSerializer, EntrySerializer

import json


class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class EntryView(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        """
        Return a list of all users.
        """
        if 'file' in request.FILES:
            print("file received")
            file = request.FILES['file']
            data = json.load(file)
            for entry in data:
                Entry.objects.create(user=request.user,
                                     title=entry['title'],
                                     body=entry['body'],
                                     entryId=entry['id'],
                                     userId=entry['userId'])
                print("created")
        else:
            print("not ", request.FILES)

        entries = Entry.objects.filter(user=request.user)
        data = EntrySerializer(entries, many=True).data
        return Response(data)

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        entries = Entry.objects.filter(user=request.user)
        data = EntrySerializer(entries, many=True).data
        return Response(data)
