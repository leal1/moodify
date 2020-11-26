package com.example.moodifyserver.util;

import com.amazonaws.services.rekognition.model.Emotion;

import java.util.function.Predicate;

public class EmotionConditions {
    public static Predicate<Emotion> condHappy = emotion -> emotion.getType().equals("HAPPY");
    public static Predicate<Emotion> condSad = emotion -> emotion.getType().equals("SAD");
    public static Predicate<Emotion> condAngry = emotion -> emotion.getType().equals("ANGRY");
    public static Predicate<Emotion> condCalm = emotion -> emotion.getType().equals("CALM");
}
