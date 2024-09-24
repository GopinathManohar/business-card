import React, { useEffect } from 'react';

const DownloadContact = () => {
  useEffect(() => {
    // Function to download the VCF file
    const downloadVCF = () => {
      const link = document.createElement('a');
      link.href = 'https://storage.googleapis.com/ajex-digital-card/contact.vcf';
      link.download = 'contact.vcf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Function to prompt the user to save the contact
      setTimeout(() => {
        const vcfFile = new Blob([link.href], { type: 'text/vcard' });
        const vcfUrl = URL.createObjectURL(vcfFile);
        const saveLink = document.createElement('a');
        saveLink.href = vcfUrl;
        saveLink.download = 'contact.vcf';
        document.body.appendChild(saveLink);
        saveLink.click();
        document.body.removeChild(saveLink);
      }, 1000); // Adjust the timeout as needed
    };

    // Call the function
    downloadVCF();
  }, []);

  return (
    <div>
      <h2>Downloading and Saving Contact...</h2>
    </div>
  );
};

export default DownloadContact;
