### Step 1

Add `assets/icons` to your `frontend/public/assets` folder

### Step 2

Add `file.input.tsx` to your `frontend/src/components/forms` folder

### Step 3

See [example/example.screen.tsx](https://github.com/emiliendeon/file-input-for-fmp-reactjs-starter/blob/main/example/example.screen.tsx) for usage

### Step 4

If you want to use it with [S3 upload module](https://fast-modular-project.com/modules/upload-to-S3-bucket), you can modify the **addFiles** function of `file.input.tsx` like this :

```typescript
const addFiles = async event => {
    let files = [...event.target.files];
    for (const file of files) {
        const s3Url = await uploadFile(file);
        file.s3Url = s3Url;
    }
    if (props.multiple) {
        setFiles(prev => [...prev, ...files]);
    } else {
        setFiles(files);
    }
};
```
