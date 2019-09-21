from django.shortcuts import render

# Create your views here.
"""
handle binary audio file upload that rest server is unable to parse by default
"""
class AudioParser(BaseParser):
    media_type = 'application/octet-stream'
    def parse(self, stream, media_type='application/octet-stream', parser_context=None):
        return stream.read()

"""
Save user attempt for a question
"""
class SaveAttemptAudioView(APIView):
    parser_classes = (AudioParser,)

    def post(self, request):
        try:
            attempt = Attempt.objects.create_attempt(request.data)
            # do your predictions
            # update attempt model with the prediction and save it
            # create a serializer for prediction
            # and return the prediction
            return Response({'course': serializers.PredictionSerializer(prediction).data, status=201)
        except Exception as e:
            print(e)
            return Response({"result":"error"}, status=400)
