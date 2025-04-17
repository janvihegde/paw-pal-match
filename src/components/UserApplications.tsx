
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserApplications = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pet Adoption Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div>List of pending and past adoption applications</div>
      </CardContent>
    </Card>
  );
};

export default UserApplications;
