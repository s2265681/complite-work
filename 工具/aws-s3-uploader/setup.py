from setuptools import setup, find_packages

setup(
    name="aws-s3-uploader",
    version="1.0.0",
    description="AWS S3 文件上传工具，专门用于上传 contact.groupV1-testWWWW.json 文件",
    author="Your Name",
    author_email="your.email@example.com",
    packages=find_packages(),
    install_requires=[
        "boto3>=1.34.0",
        "python-dotenv>=1.0.0",
        "click>=8.1.7",
    ],
    entry_points={
        "console_scripts": [
            "s3-uploader=s3_uploader:cli",
        ],
    },
    python_requires=">=3.7",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
) 