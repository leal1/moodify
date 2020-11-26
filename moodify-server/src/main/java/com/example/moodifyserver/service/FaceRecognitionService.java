package com.example.moodifyserver.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.AmazonRekognitionClientBuilder;
import com.amazonaws.services.rekognition.model.*;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.moodifyserver.util.EmotionConditions;
import org.springframework.stereotype.Service;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class FaceRecognitionService {
    public String getMood(String photo) throws IOException {
        return uploadPhoto(photo);

    }
    public String uploadPhoto(String photo) throws IOException, SdkClientException, AmazonS3Exception {
        Regions clientRegion = Regions.US_WEST_2;
        String bucketName = "moodify-rekognition-bucket";
        UUID uuid = UUID.randomUUID();
        String key = uuid.toString();
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(clientRegion)
               // .withCredentials(new EnvironmentVariableCredentialsProvider())
                .build();

        byte[] bI = java.util.Base64.getMimeDecoder().decode(photo.split(",")[1]);
        InputStream fis = new ByteArrayInputStream(bI);
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("image/png");
        objectMetadata.setContentLength((long) bI.length);

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName,key,fis,objectMetadata);
        s3Client.putObject(putObjectRequest);
        return detectFace(key,bucketName,clientRegion);
    }

    public String detectFace(String key, String bucketName,Regions clientRegion) {
        AmazonRekognition rekognitionClient = AmazonRekognitionClientBuilder.standard()
                .withRegion(clientRegion)
                .build();

        DetectFacesRequest request = new DetectFacesRequest()
                .withImage(new Image()
                        .withS3Object(new S3Object()
                                .withName(key)
                                .withBucket(bucketName)))
                .withAttributes(Attribute.ALL);
        try {
            DetectFacesResult result = rekognitionClient.detectFaces(request);
            List<FaceDetail> faceDetails = result.getFaceDetails();

            for (FaceDetail face : faceDetails) {
                if (request.getAttributes().contains("ALL")) {
                    List<Emotion> emotions = face.getEmotions().stream().filter(EmotionConditions.condHappy
                            .or(EmotionConditions.condAngry)
                            .or(EmotionConditions.condSad)
                            .or(EmotionConditions.condCalm))
                            .collect(Collectors.toList());
                    return emotions.get(0).getType();
                }
            }
        } catch (AmazonRekognitionException e) {
            e.printStackTrace();
        }
        return "";
    }
}
