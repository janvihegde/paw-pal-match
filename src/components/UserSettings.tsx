
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UserSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Settings and preferences will go here</div>
        <Button variant="destructive">Delete Account</Button>
      </CardContent>
    </Card>
  );
};

export default UserSettings;
