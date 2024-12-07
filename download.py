import requests
import shutil
import socket


def check_internet_connection():
    """Check if there's an active internet connection."""
    try:
        # Try to connect to a reliable server (Google's DNS)
        socket.create_connection(("8.8.8.8", 53), timeout=5)
        return True
    except OSError:
        return False


def download_and_extract_file(nomecimitero, url):
    """Download and extract the file."""
    try:
        print(f"Downloading {nomecimitero}...")
        # Download file from URL
        r = requests.get(url, allow_redirects=True)

        # Save file
        with open(nomecimitero, "wb") as file:
            file.write(r.content)
        print(f"{nomecimitero} downloaded successfully.")

        print(f"Extracting {nomecimitero}...")
        # Unzipping file
        shutil.unpack_archive(nomecimitero, "./")
        print(f"{nomecimitero} extracted successfully.")
    except requests.RequestException as e:
        print(f"Error during download: {e}")
    except shutil.ReadError as e:
        print(f"Error during extraction: {e}")


def main():
    # Nome del cimitero
    nomecimitero = "cimitero1.zip"
    # URL del file
    url = "http://backend.memoryp.org:3001/cimitero/get/" + nomecimitero

    # Verifica la connessione a internet
    if check_internet_connection():
        download_and_extract_file(nomecimitero, url)
    else:
        print("No internet connection. Please check your network and try again.")


if __name__ == "__main__":
    main()
