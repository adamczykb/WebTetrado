from backend.models import PushInformation
from django import forms

class SubscriptionForm(forms.ModelForm):

    class Meta:
        model = PushInformation
        fields = ('endpoint', 'auth', 'p256dh', 'browser')

    def get_or_save(self):
        subscription, created = PushInformation.objects.get_or_create(**self.cleaned_data)
        return subscription