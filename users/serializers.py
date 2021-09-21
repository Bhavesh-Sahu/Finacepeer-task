from datetime import datetime

from rest_framework.serializers import ModelSerializer, IntegerField

from .models import CustomUser, Entry


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'last_login', 'date_joined', 'is_staff')


class EntrySerializer(ModelSerializer):
    id = IntegerField(source='entryId')

    class Meta:
        model = Entry
        fields = ('title', 'body', 'userId', 'id')
