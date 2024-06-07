function getBookingConfirmationTemplate(customerName: any, serviceName: any, appointmentDate: any, appointmentTime: any, locationAddress: any, viewBookingUrl: any, contactEmail: any, contactPhone: any, companyName: any) {
  return `
    <mjml>
      <mj-head>
        <mj-title>Booking Confirmation</mj-title>
        <mj-preview>Your booking has been confirmed</mj-preview>
      </mj-head>
      <mj-body width="600px">
        <mj-section background-color="#f0f0f0" padding="20px">
          <mj-column>
            <mj-text align="center" font-size="24px" color="#333333" font-family="Helvetica, Arial, sans-serif">
              Booking Confirmation
            </mj-text>
            <mj-divider border-color="#346DB7" border-width="2px" width="50%" />
          </mj-column>
        </mj-section>
        
        <mj-section background-color="#ffffff" padding="20px">
          <mj-column>
            <mj-text font-size="18px" color="#333333" font-family="Helvetica, Arial, sans-serif">
              Hello ${customerName},
            </mj-text>
            <mj-text font-size="16px" color="#555555" font-family="Helvetica, Arial, sans-serif">
              Thank you for booking with us. Here are the details of your appointment:
            </mj-text>
            <mj-table cellpadding="10" cellspacing="0" width="100%">
              <tr>
                <td style="font-family:Helvetica, Arial, sans-serif; color:#333333;">Service:</td>
                <td style="font-family:Helvetica, Arial, sans-serif; color:#555555;">${serviceName}</td>
              </tr>
              <tr>
                <td style="font-family:Helvetica, Arial, sans-serif; color:#333333;">Date:</td>
                <td style="font-family:Helvetica, Arial, sans-serif; color:#555555;">${appointmentDate}</td>
              </tr>
              <tr>
                <td style="font-family:Helvetica, Arial, sans-serif; color:#333333;">Time:</td>
                <td style="font-family:Helvetica, Arial, sans-serif; color:#555555;">${appointmentTime}</td>
              </tr>
              <tr>
                <td style="font-family:Helvetica, Arial, sans-serif; color:#333333;">Location:</td>
                <td style="font-family:Helvetica, Arial, sans-serif; color:#555555;">${locationAddress}</td>
              </tr>
            </mj-table>
          </mj-column>
        </mj-section>

        <mj-section background-color="#ffffff" padding="20px">
          <mj-column>
            <mj-button background-color="#346DB7" color="#ffffff" font-family="Helvetica, Arial, sans-serif" href="${viewBookingUrl}">
              View Your Booking
            </mj-button>
          </mj-column>
        </mj-section>

        <mj-section background-color="#f0f0f0" padding="20px">
          <mj-column>
            <mj-text font-size="14px" color="#555555" font-family="Helvetica, Arial, sans-serif">
              If you have any questions or need to reschedule, please contact us at ${contactEmail} or ${contactPhone}.
            </mj-text>
            <mj-text font-size="14px" color="#555555" font-family="Helvetica, Arial, sans-serif">
              Thank you,<br/>${companyName}
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;
}

export default getBookingConfirmationTemplate