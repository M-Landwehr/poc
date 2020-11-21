package com.example.core;

import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import javax.validation.Valid;

public class ExampleResource2 {

    public void uploadPost(@MultipartForm @Valid MultipartData data) {

    }
}
