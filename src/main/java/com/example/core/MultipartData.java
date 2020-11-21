package com.example.core;

import io.swagger.annotations.ApiModelProperty;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import javax.ws.rs.FormParam;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.util.Objects;


public class MultipartData {

    private @Valid File file;
    private @Valid String name;

    /**
     *
     **/
    public MultipartData file(File file) {
        this.file = file;
        return this;
    }


    @ApiModelProperty(value = "")
    @PartType(MediaType.APPLICATION_OCTET_STREAM)
    @FormParam("file")
    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    /**
     *
     **/
    public MultipartData name(String name) {
        this.name = name;
        return this;
    }


    @ApiModelProperty(value = "")
    @FormParam("name")
    @Pattern(regexp = ".*")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MultipartData multipartData = (MultipartData) o;
        return Objects.equals(this.file, multipartData.file) &&
                Objects.equals(this.name, multipartData.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(file, name);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class MultipartData {\n");

        sb.append("    file: ").append(toIndentedString(file)).append("\n");
        sb.append("    name: ").append(toIndentedString(name)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }


}

